"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Ellipsis, Search, X, Settings,
  LogOut,} from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Developments", path: "/developments" },
  { name: "Buildings", path: "/buildings" },
  { name: "Units", path: "/units" },
  { name: "Leads", path: "/leads" },
  { name: "Companies", path: "/companies" },
  { name: "Contacts", path: "/contacts" },
  { name: "Deals", path: "/deals" },
  { name: "Activities", path: "/activities" },
  { name: "Attorney Firms", path: "/attorney-firms" },
  { name: "Reports", path: "/reports" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(navLinks.length);
  const [moreOpen, setMoreOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
   const container = containerRef.current;
   const measure = measureRef.current;

   if (!container || !measure) return;

   const updateVisibleLinks = () => {
     // Mobile: all links go into the three-dot menu
     if (window.innerWidth < 768) {
       setVisibleCount(0);
       return;
     }

     const availableWidth = container.clientWidth;

     const linkElements = Array.from(
       measure.querySelectorAll<HTMLElement>("[data-nav-item]"),
     );

     const widths = linkElements.map((el) => el.getBoundingClientRect().width);

     const gap = 1;
     const moreButtonWidth = 46;

     const totalWidth =
       widths.reduce((sum, width) => sum + width, 0) +
       Math.max(0, widths.length - 1) * gap;

     // All links fit: show all, hide three dots
     if (totalWidth <= availableWidth) {
       setVisibleCount(navLinks.length);
       return;
     }

     // Reserve space for three-dot button
     let usedWidth = moreButtonWidth;
     let count = 0;

     for (const width of widths) {
       if (usedWidth + width + gap > availableWidth) break;

       usedWidth += width + gap;
       count++;
     }

     setVisibleCount(count);
   };

   const observer = new ResizeObserver(updateVisibleLinks);

   observer.observe(container);

   window.addEventListener("resize", updateVisibleLinks);

   updateVisibleLinks();

   return () => {
     observer.disconnect();
     window.removeEventListener("resize", updateVisibleLinks);
   };
 }, []);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [moreOpen]);

  useEffect(() => {
    if (!profileOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileOpen]);

  const visibleLinks = navLinks.slice(0, visibleCount);
  const hiddenLinks = navLinks.slice(visibleCount);

 return (
   <header className="fixed top-0 left-0 z-50 w-full bg-[var(--background-white)] shadow-[var(--card-shadow)]">
     <nav className="flex h-[65px] w-full items-center gap-3 px-4 md:gap-6 md:px-[30px]">
       {/* Logo */}
       <Link
         href="/"
         className="flex shrink-0 items-center gap-1 mr-3  max-[900px]:mr-0"
       >
         <div className="flex h-[44px] w-[34px] items-center justify-center">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 1140 1140"
             fill="none"
             aria-label="Gold circular monogram logo"
           >
             <g fill="var(--primary)">
               <path d="M590 94h60v954h-60z" />
               <path d="M435 202h60v100h-60zM745 202h60v100h-60z" />
               <path d="M495 395v627C336 971 229 827 229 659c0-178 117-329 278-379 36-11 73-17 113-17s77 6 113 17c161 50 278 201 278 379 0 168-107 312-266 363V395l60 35v493c90-58 146-155 146-264 0-173-140-313-313-313S289 486 289 659c0 109 56 206 146 264V430z" />
             </g>
           </svg>
         </div>

         <span
           className={`block overflow-hidden whitespace-nowrap
    text-[20px] font-bold tracking-[-0.8px]
    text-[var(--text-primary)]
    transition-[max-width,opacity,transform] duration-300 ease-in-out
    ${
      mobileSearchOpen
        ? "max-w-0 -translate-x-3 opacity-0 md:max-w-[160px] md:translate-x-0 md:opacity-100"
        : "max-w-[160px] translate-x-0 opacity-100"
    }
  `}
         >
           REALTOR360
         </span>
       </Link>

       {/* Navigation Links */}
       <div
         ref={containerRef}
         className={`relative flex min-w-0 items-center  justify-end overflow-visible
         transition-[max-width,opacity,transform] duration-300 ease-in-out
         ${
           mobileSearchOpen
             ? "max-w-0 -translate-x-3 opacity-0 pointer-events-none md:max-w-none md:flex-1 md:translate-x-0 md:opacity-100 md:pointer-events-auto"
             : "max-w-[1200px] flex-1 translate-x-0 opacity-100"
         }`}
       >
         {/* Desktop Navigation Links */}
         <div className="ml-auto hidden min-w-0 items-center justify-center gap-[1px] overflow-hidden whitespace-nowrap md:flex">
           {visibleLinks.map((item) => (
             <Link
               key={item.name}
               href={item.path}
               className={`
          flex h-[45px] shrink-0 items-center justify-end
          rounded-[13px] px-[14px] text-[16px]
          font-normal transition-colors duration-200
          ${
            pathname === item.path
              ? "bg-[var(--primary)] text-[var(--text-white)]"
              : "text-[var(--text-primary)] hover:bg-[var(--background-muted)]"
          }
        `}
             >
               {item.name}
             </Link>
           ))}
         </div>

         {hiddenLinks.length > 0 && (
           <div ref={menuRef} className="relative ml-auto shrink-0">
             <button
               type="button"
               aria-label="More navigation options"
               aria-expanded={moreOpen}
               aria-haspopup="menu"
               onClick={() => {
                 setMoreOpen((prev) => !prev);
                 setProfileOpen(false);
               }}
               className="flex h-[45px] w-[45px] items-center justify-center rounded-lg text-[var(--text-primary)] hover:bg-[var(--primary-light)]"
             >
               <Ellipsis size={22} />
             </button>

             {moreOpen && (
               <div
                 role="menu"
                 className="absolute right-0 top-full z-50 mt-4 max-h-[350px] w-[210px] overflow-y-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background-white)] p-2 shadow-[var(--card-shadow)]"
               >
                 {hiddenLinks.map((item) => (
                   <Link
                     key={item.name}
                     href={item.path}
                     role="menuitem"
                     onClick={() => setMoreOpen(false)}
                     className={`block rounded-md px-4 py-3 text-[16px] transition-colors ${
                       pathname === item.path
                         ? "bg-[var(--primary)] text-[var(--text-white)]"
                         : "text-[var(--text-primary)] hover:bg-[var(--background-muted)]"
                     }`}
                   >
                     {item.name}
                   </Link>
                 ))}
               </div>
             )}
           </div>
         )}

         <div
           ref={measureRef}
           aria-hidden="true"
           className="pointer-events-none invisible absolute left-0 top-0 flex w-max gap-[1px] whitespace-nowrap"
         >
           {navLinks.map((item) => (
             <span
               key={item.name}
               data-nav-item
               className="flex h-[45px] items-center justify-center rounded-[13px] px-[14px] text-[18px] font-normal"
             >
               {item.name}
             </span>
           ))}
         </div>
       </div>

       {/* Desktop Search */}
       <div className="hidden h-[50px] w-[220px] shrink-0 items-center gap-2 rounded-[13px] bg-[var(--background)] px-3 md:flex">
         <input
           type="text"
           placeholder="Search..."
           aria-label="Search"
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="w-full min-w-0 bg-transparent text-[14px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
         />

         <Search size={18} className="shrink-0 text-[var(--text-secondary)]" />
       </div>

       {/* Mobile Search */}

       <div
         className={`ml-auto flex min-w-0 items-center justify-end md:hidden
    transition-[flex-grow] duration-300 ease-in-out
    ${mobileSearchOpen ? "flex-1" : "flex-none"}
  `}
       >
         <div
           className={`flex h-[46px] min-w-0 items-center overflow-hidden
      rounded-xl bg-[var(--background)]
      transition-[width,padding] duration-300 ease-in-out
      ${mobileSearchOpen ? "w-full gap-2 px-3" : "w-[44px] justify-center px-0"}
    `}
         >
           <button
             type="button"
             aria-label="Open search"
             onClick={() => {
               if (!mobileSearchOpen) {
                 setMoreOpen(false);
                 setProfileOpen(false);
                 setMobileSearchOpen(true);
               }
             }}
             className="flex h-[44px] w-[24px] shrink-0 items-center justify-center text-[var(--text-primary)]"
           >
             <Search size={21} />
           </button>

           <input
             type="text"
             placeholder="Search..."
             aria-label="Mobile search"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             tabIndex={mobileSearchOpen ? 0 : -1}
             className={`min-w-0 bg-transparent text-[14px]
        text-[var(--text-primary)] outline-none
        transition-[width,opacity] duration-300 ease-in-out
        ${
          mobileSearchOpen
            ? "w-full flex-1 opacity-100"
            : "w-0 flex-none opacity-0 pointer-events-none"
        }
      `}
           />

           <button
             type="button"
             aria-label="Close search"
             onClick={() => setMobileSearchOpen(false)}
             tabIndex={mobileSearchOpen ? 0 : -1}
             className={`flex shrink-0 items-center justify-center
        text-[var(--text-secondary)]
        transition-[width,opacity,transform] duration-300 ease-in-out
        ${
          mobileSearchOpen
            ? "w-[20px] scale-100 opacity-100"
            : "w-0 scale-75 opacity-0 pointer-events-none"
        }
      `}
           >
             <X size={20} />
           </button>
         </div>
       </div>

       {/* Profile */}

       <div className={`relative shrink-0 `}>
         {/* Profile Button */}
         <button
           type="button"
           aria-label="Open profile menu"
           aria-expanded={profileOpen}
           aria-haspopup="menu"
           onClick={() => {
             setProfileOpen((prev) => !prev);
             setMoreOpen(false);
           }}
           className={`items-center gap-2 md:gap-3
            ${mobileSearchOpen ? "hidden" : "flex"}`}
         >
           <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full bg-[var(--background)] md:h-[45px] md:w-[45px]">
             <Image
               src="/profile.jpg"
               alt="Profile"
               fill
               sizes="(max-width: 767px) 40px, 45px"
               className="object-cover"
             />
           </div>

           <ChevronDown
             size={18}
             strokeWidth={2.5}
             className={`text-[var(--text-primary)] transition-transform duration-200 ${
               profileOpen ? "rotate-180" : ""
             }`}
           />
         </button>

         {profileOpen && (
           <div
             role="menu"
             className="absolute right-0 top-full z-[60] mt-4 w-[280px] max-w-[calc(100vw-24px)] overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background-white)] shadow-[var(--card-shadow)]"
           >
             <div className="flex flex-col items-center px-2 py-4">
               <div className="relative mb-3 h-[70px] w-[70px] overflow-hidden rounded-full bg-[var(--background)]">
                 <Image
                   src="/profile.jpg"
                   alt="Profile"
                   fill
                   sizes="70px"
                   className="object-cover"
                 />
               </div>

               <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">
                 Rick John
               </h3>

               <p className="mt-1 text-[12px] text-[var(--text-secondary)]">
                 rick.john@example.com
               </p>
             </div>

             <div className="mx-4 border-t border-[var(--border)]" />

             <div className="p-2">
               <Link
                 href="/settings"
                 role="menuitem"
                 onClick={() => setProfileOpen(false)}
                 className="flex w-full justify-center items-center gap-3 rounded-lg px-4 py-3 text-[14px] text-[var(--text-primary)] transition-colors hover:bg-[var(--background-muted)]"
               >
                 <Settings size={18} />
                 <span>Settings</span>
               </Link>

               <button
                 type="button"
                 role="menuitem"
                 onClick={() => {
                   setProfileOpen(false);
                   // Add your logout functionality here.
                 }}
                 className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 text-[14px] text-[var(--danger)] transition-colors hover:bg-[var(--danger-bg)]"
               >
                 <LogOut size={18} />
                 <span>Logout</span>
               </button>
             </div>
           </div>
         )}
       </div>
     </nav>
   </header>
 );
}
