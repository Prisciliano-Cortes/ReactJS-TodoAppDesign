import { useEffect, useState } from "react"
import { MoonIcon } from "../icon/MoonIcon"
import { SunIcon } from "../icon/SunIcon"

const initialStateDarkMode = localStorage.getItem('theme') === 'dark'

export const Header = () => {

    const [darkMode, setDarkMode] = useState(initialStateDarkMode)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])
    

    return (
        <header className="container mx-auto px-4 pt-8 md:max-w-xl">
            <div className="flex justify-between">
                <h1 className="uppercase text-white text-2xl font-bold tracking-[0.3em]">
                    Todo
                </h1>

                <button onClick={() => setDarkMode(!darkMode)}>
                    {
                        darkMode ? <MoonIcon /> : <SunIcon />
                    }
                </button>
            </div>
        </header>
    )
}