"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

const leadsContacts = [
  {
    id: 1,
    name: "John Doe",
    location: "New York",
    image: "/avtar1.jpg",
    phone: "+1234567890",
  },
  {
    id: 2,
    name: "Jessica Chen",
    location: "California, LA",
    image: "/avtar2.jpg",
    phone: "+1234567891",
  },
  {
    id: 3,
    name: "Evan Chris",
    location: "New York",
    image: "/avtar3.jpg",
    phone: "+1234567892",
  },
  {
    id: 4,
    name: "Jack B.",
    location: "Ohio, Columbus",
    image: "/avtar4.jpg",
    phone: "+1234567893",
  },
  {
    id: 5,
    name: "Emily Paris",
    location: "California, LA",
    image: "/avtar5.jpg",
    phone: "+1234567894",
  },
];

export default function LeadsContacts() {
  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-[var(--radius-lg)] bg-[var(--background-white)] px-4 py-6 shadow-[var(--card-shadow)]">

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">
          Leads Contacts
        </h2>

        <Link
          href="/contacts"
          aria-label="View all contacts"
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--primary-light)] hover:text-[var(--primary-hover)]"
        >
          <ArrowUpRight size={20} strokeWidth={2} />
        </Link>
      </div>

   
      <div className="flex flex-col gap-5">
        {leadsContacts.map((contact) => (
          <div key={contact.id} className="flex min-w-0 items-center gap-3">
    
            <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full bg-[var(--background)]">
              <Image
                src={contact.image}
                alt={contact.name}
                fill
                sizes="38px"
                className="object-cover"
              />
            </div>

      
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[14px] font-medium leading-tight text-[var(--text-primary)]">
                {contact.name}
              </h3>

              <p className="truncate text-[12px] leading-tight text-[var(--text-secondary)]">
                {contact.location}
              </p>
            </div>


            <a
              href={`tel:${contact.phone}`}
              aria-label={`Call ${contact.name}`}
              className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--primary-light)] hover:text-[var(--primary-hover)]"
            >
              <Phone size={14} fill="currentColor" strokeWidth={1.5} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
