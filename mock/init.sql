-- TEST MOUNT FILE
-- TEST INIT

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE USER_TABLE (
    user_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE,
    profile_picture VARCHAR(300),
    password VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CONVERSATION(
    conversation_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_group BOOLEAN NOT NULL DEFAULT FALSE,
    group_name VARCHAR(100) NOT NULL DEFAULT 'Direct Message',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE USER_CONVERSATION(
    user_id CHAR(36) NOT NULL,
    conversation_id CHAR(36) NOT NULL,
    PRIMARY KEY(user_id, conversation_id),
    FOREIGN KEY(user_id) REFERENCES USER_TABLE(user_id),
    FOREIGN KEY(conversation_id) REFERENCES CONVERSATION(conversation_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MESSAGE(
    message_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id CHAR(36) NOT NULL,
    message_text VARCHAR(500) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    conversation_id CHAR(36) NOT NULL,
    FOREIGN KEY(sender_id) REFERENCES USER_TABLE(user_id),
    FOREIGN KEY(conversation_id) REFERENCES CONVERSATION(conversation_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---------------- Trigger ----------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_updated_at
BEFORE UPDATE ON USER_TABLE
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER conversation_updated_at
BEFORE UPDATE ON CONVERSATION
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER message_updated_at
BEFORE UPDATE ON MESSAGE
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

---------------- MOCKING DATA ----------------
-- USER_TABLE
INSERT INTO USER_TABLE (user_id, username, profile_picture, password)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'user1', 'profile1.jpg', 'password1'),
    ('22222222-2222-2222-2222-222222222222', 'user2', 'profile2.jpg', 'password2'),
    ('33333333-3333-3333-3333-333333333333', 'user3', 'profile3.jpg', 'password3'),
    ('64874aaa-93ee-44b4-8edb-294a5f503735', 'netkubb', '', 'netkubb'),
    ('886c5084-8f13-4027-8b78-a913bd3598d8', 'build', '', 'build');

-- CONVERSATION
INSERT INTO CONVERSATION (conversation_id, is_group)
VALUES
    ('44444444-4444-4444-4444-444444444444', FALSE),
    ('55555555-5555-5555-5555-555555555555', FALSE),
    ('66666666-6666-6666-6666-666666666666', TRUE),
    ('9e0c5206-c0f2-40d0-8816-770a674da127', FALSE);

-- USER_CONVERSATION
INSERT INTO USER_CONVERSATION (user_id, conversation_id)
VALUES
    ('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444'),
    ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444'),
    ('22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555'),
    ('33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555'),
    ('11111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666'),
    ('22222222-2222-2222-2222-222222222222', '66666666-6666-6666-6666-666666666666'),
    ('33333333-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666'),
    ('64874aaa-93ee-44b4-8edb-294a5f503735', '9e0c5206-c0f2-40d0-8816-770a674da127'),
    ('886c5084-8f13-4027-8b78-a913bd3598d8', '9e0c5206-c0f2-40d0-8816-770a674da127');

-- MESSAGE
INSERT INTO MESSAGE (message_id, sender_id, message_text, is_read, conversation_id)
VALUES
    ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Hello from user1', FALSE, '44444444-4444-4444-4444-444444444444'),
    ('88888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 'Hello from user2', FALSE, '55555555-5555-5555-5555-555555555555'),
    ('99999999-9999-9999-9999-999999999999', '33333333-3333-3333-3333-333333333333', 'Hello from user3', FALSE, '66666666-6666-6666-6666-666666666666');
