import type { LayoutProps } from 'rwsdk/router'
import { Navigation } from '@/app/components/Navigation'
import { Footer } from '@/app/components/Footer'
import { AuthProvider } from '@/app/context/AuthProvider'
//import { EventsProvider } from '../context/EventsProvider';

export function AppLayout({ children, requestInfo }: LayoutProps) {
  const user = requestInfo?.ctx.user ?? null;
  
  return (
    <AuthProvider initialUser={user}>
      {/*<EventsProvider>*/}
      <div className="app-container">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Navigation />
          </div>
        </header>
        <main>{children}</main>
        <Footer />
      </div>
      {/*</EventsProvider>*/}
    </AuthProvider> 
  )
}