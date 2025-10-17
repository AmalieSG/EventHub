import type { LayoutProps } from 'rwsdk/router'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'

// The Layout component receives the 'children' it is wrapping.
export function AppLayout({ children }: LayoutProps) {
  return (
    <div className="app-container">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Navigation />
        </div>
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  )
}