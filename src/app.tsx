import { Route, Link } from "wouter";
import { PokemonTabs } from "./components/pokemon-tabs";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      {/* Header Navigation */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">{`<Activity /> Component and Query Explorer - with Pokemon!`}</h1>
              <p className="text-sm text-muted-foreground">
                Query components wrapped in React Activity Component
              </p>
            </div>
            <nav className="flex gap-1">
              <Link
                href="/"
                className={(active: boolean) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                Non-Suspending
              </Link>
              <Link
                href="/suspending"
                className={(active: boolean) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                Suspending
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 w-full flex-col items-center justify-center p-4">
        <Route path="/">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Non-Suspending Mode</h2>
            <p className="text-sm text-muted-foreground">
              Handles loading states internally
            </p>
          </div>
          <PokemonTabs mode="non-suspending" />
        </Route>

        <Route path="/suspending">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Suspending Mode</h2>
            <p className="text-sm text-muted-foreground">
              Uses React Suspense for loading states
            </p>
          </div>
          <PokemonTabs mode="suspending" />
        </Route>
      </main>
    </div>
  );
}

export default App;
