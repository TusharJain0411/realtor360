"use client";

import Image from "next/image";

const listings = [
  {
    id: 1,
    property: "Maplewood House",
    image: "/property1.jpg",
    type: "House",
    units: 12,
    price: "Rs.85L",
    views: 125,
    leads: 37,
    status: "8/12 Occupied",
    statusType: "occupied",
  },
  {
    id: 2,
    property: "Serenity Villa",
    image: "/property2.jpg",
    type: "Villa",
    units: 9300,
    price: "Rs.2.8Cr",
    views: 930,
    leads: 42,
    status: "Available",
    statusType: "available",
  },
  {
    id: 3,
    property: "Rosehill Cottage",
    image: "/property3.jpg",
    type: "House",
    units: 25,
    price: "Rs.1.1Cr",
    views: 355,
    leads: 17,
    status: "Available",
    statusType: "available",
  },
  {
    id: 4,
    property: "Skyline Edge",
    image: "/property4.jpg",
    type: "Apartment",
    units: 17,
    price: "Rs.75L",
    views: 425,
    leads: 13,
    status: "Sold Out",
    statusType: "sold",
  },
];

const leadAvatars = ["/avtar1.jpg", "/avtar5.jpg"];

const statusStyles: Record<string, string> = {
  occupied: "bg-[var(--success-bg)] text-[var(--success)]",
  available: "bg-[var(--success-bg)] text-[var(--success)]",
  sold: "bg-[var(--danger-bg)] text-[var(--danger)]",
};

export default function ActiveListing() {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-[var(--radius-lg)] bg-[var(--background-white)] px-4 py-4 shadow-[var(--card-shadow)]">
      <h2 className="mb-4 text-[16px] font-semibold text-[var(--text-primary)]">
        Active Listing
      </h2>

      <div
        tabIndex={0}
        className="listing-scroll w-full min-w-0 overflow-x-auto"
      >
        <table className="w-full min-w-[850px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="bg-[var(--background)]">
              {[
                "Property",
                "Type",
                "Units",
                "Price",
                "Active Leads",
                "Views",
                "Status",
              ].map((heading, index, arr) => (
                <th
                  key={heading}
                  className={`px-2 py-2 text-[14px] font-semibold whitespace-nowrap text-[var(--text-primary)] ${
                    index === 0 ? "rounded-l-lg" : ""
                  } ${index === arr.length - 1 ? "rounded-r-lg" : ""}`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {listings.map((listing) => (
              <tr
                key={listing.id}
                className="transition-colors duration-200 hover:bg-[var(--background-muted)]"
              >
                <td className="px-3 py-2">
                  <div className="flex min-w-[155px] items-center gap-1">
                    <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-[10px] bg-[var(--background)]">
                      <Image
                        src={listing.image}
                        alt={listing.property}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>

                    <span className="max-w-[115px] text-[12px] leading-tight font-medium text-[var(--text-primary)]">
                      {listing.property}
                    </span>
                  </div>
                </td>

                <td className="px-3 py-2 text-[12px] text-[var(--text-secondary)]">
                  {listing.type}
                </td>

                <td className="px-3 py-2 text-[12px] text-[var(--text-secondary)]">
                  {listing.units}
                </td>

                <td className="whitespace-nowrap px-3 py-2 text-[12px] font-medium text-[var(--text-primary)]">
                  {listing.price}
                </td>

                <td className="px-3 py-2">
                  <div className="flex items-center pl-1">
                    {leadAvatars.map((avatar, index) => (
                      <div
                        key={avatar}
                        className={`relative h-[30px] w-[30px] shrink-0 overflow-hidden rounded-full border-2 border-[var(--background-white)] bg-[var(--background)] ${
                          index === 0 ? "" : "-ml-2"
                        }`}
                      >
                        <Image
                          src={avatar}
                          alt={`Lead ${index + 1}`}
                          fill
                          sizes="30px"
                          className="object-cover"
                        />
                      </div>
                    ))}

                    <span className="relative z-10 -ml-2 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--background-white)] bg-[var(--more-number)] text-[11px] font-medium text-[var(--text-primary)]">
                      +{Math.max(listing.leads - leadAvatars.length, 0)}
                    </span>
                  </div>
                </td>

                <td className="px-3 py-2 text-[12px] text-[var(--text-secondary)]">
                  {listing.views}
                </td>

                <td className="px-3 py-2">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-medium ${
                      statusStyles[listing.statusType]
                    }`}
                  >
                    {listing.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
