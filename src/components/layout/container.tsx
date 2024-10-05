export function Container({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col min-h-screen bg-white'>{children}</div>;
}
