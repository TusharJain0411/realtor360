interface PagePlaceholderProps {
  title: string;
}

export default function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <main className="flex min-h-[calc(100vh-65px)] w-full items-center justify-center bg-[var(--background)] px-4 pt-[65px]">
      <h1 className="text-center text-3xl font-semibold text-[var(--text-primary)] md:text-5xl">
        {title}
      </h1>
    </main>
  );
}
