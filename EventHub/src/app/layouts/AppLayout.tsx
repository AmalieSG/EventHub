import type { LayoutProps } from 'rwsdk/router'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { EventsProvider } from '../context/EventsProvider'

// The Layout component receives the 'children' it is wrapping.
export function AppLayout({ children }: LayoutProps) {
  return (
    <EventsProvider>
      <div className="app-container">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Navigation />
          </div>
        </header>

        <main>{children}</main>

        <Footer />
      </div>
    </EventsProvider>
  )
}