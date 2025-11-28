'use client';{/* Ferramentas deve ser renderizada do lado do cliente (navegador) */}
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";

const ModeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    
    // Evita problemas de renderização no lado do cliente
    useEffect(() => {
        const id = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(id);
    }, []);
    if (!mounted) {
        return null;
    }

    // Lógica do theme toggle
    return ( 
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                { theme === 'system' ? (
                    <SunMoon />
                ): theme === 'dark' ? (
                    <MoonIcon />
                ) : (
                    <SunIcon />
                )}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel className="align-middle">Aparência</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={theme === 'system'} onClick={() => setTheme('system')}>
                System
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme === 'light'} onClick={() => setTheme('light')}>
                Light
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme === 'dark'} onClick={() => setTheme('dark')}>
                Dark
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu> );
}
 
export default ModeToggle;