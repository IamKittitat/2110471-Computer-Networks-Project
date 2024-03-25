type MenuFocus = "home" | "conversation" | "none"

export default function NavBar({ menuFocus }: { menuFocus: MenuFocus }) {
  const menuList: { name: string; focus: MenuFocus; href: string }[] = [
    { name: "Home", focus: "home", href: "/home" },
    { name: "Conversation", focus: "conversation", href: "/conversation" }
  ]

  return (
    <div className={`flex justify-between py-3 px-6 items-center`}>
      <div className="flex gap-6 items-center text-white font-noto-sans font-light">
        {menuList.map((menu, index) => (
          <a
            key={index}
            className={`${menuFocus === menu.focus ? "text-yellow-300" : ""} cursor-pointer`}
            href={menu.href}
          >
            {menu.name}
          </a>
        ))}
      </div>
    </div>
  )
}
