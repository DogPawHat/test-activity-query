import { useState } from "react";
import { PokemonCard } from "./components/PokemonCard";

const POKEMON_TABS = [
  { id: "bulbasaur", label: "Bulbasaur" },
  { id: "charmander", label: "Charmander" },
  { id: "squirtle", label: "Squirtle" },
] as const;

function App() {
  const [activePokemon, setActivePokemon] = useState<string>("bulbasaur");

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground p-4">
      <h1 className="text-3xl font-bold mb-6">Pokémon Explorer</h1>

      <div className="w-full max-w-md">
        {/* Custom Tab List */}
        <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full mb-4">
          {POKEMON_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePokemon(tab.id)}
              className={`
                inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium
                transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                flex-1
                ${
                  activePokemon === tab.id
                    ? "bg-background text-foreground shadow"
                    : "hover:bg-background/50"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Custom Tab Content */}
        <div className="mt-4">
          <PokemonCard pokemonName={activePokemon} />
        </div>
      </div>
    </main>
  );
}

export default App;
