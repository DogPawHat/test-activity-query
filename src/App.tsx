import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-2xl font-bold">Vite + React</h1>
      <Card>
        <CardContent>
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
