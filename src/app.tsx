import { PokemonTabs } from "./components/pokemon-tabs";
import { Button } from "./components/ui/button";
import { useActivityEnabled, useSuspenseEnabled } from "./lib/utils";

function App() {
  const [activityEnabled, setActivityEnabled] = useActivityEnabled();
  const [suspenseEnabled, setSuspenseEnabled] = useSuspenseEnabled();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      {/* Header Navigation */}
      <header className="border-b border-border bg-card shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{`<Activity /> Component and Query Explorer - with Pokemon!`}</h1>
            <p className="text-sm text-muted-foreground">
              Query components wrapped in React Activity Component
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-1">
              <Button
                onClick={() => setActivityEnabled(false)}
                variant={activityEnabled ? "outline" : "default"}
                size="sm"
              >
                No Activity
              </Button>
              <Button
                onClick={() => setActivityEnabled(true)}
                variant={activityEnabled ? "default" : "outline"}
                size="sm"
              >
                Activity
              </Button>
            </div>
            <div className="flex gap-1">
              <Button
                onClick={() => setSuspenseEnabled(false)}
                variant={suspenseEnabled ? "outline" : "default"}
                size="sm"
              >
                Non-Suspending
              </Button>
              <Button
                onClick={() => setSuspenseEnabled(true)}
                variant={suspenseEnabled ? "default" : "outline"}
                size="sm"
              >
                Suspending
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 w-full flex-col items-center justify-center p-4">
        <h2 className="text-xl font-semibold mb-2">
          {!activityEnabled &&
            !suspenseEnabled &&
            "Suspense and Activity disabled"}
          {activityEnabled &&
            !suspenseEnabled &&
            "Activity enabled, Suspense disabled"}
          {!activityEnabled &&
            suspenseEnabled &&
            "Activity disabled, Suspense enabled"}
          {activityEnabled &&
            suspenseEnabled &&
            "Activity and Suspense enabled"}
        </h2>
        <PokemonTabs />
      </main>
    </div>
  );
}

export default App;
