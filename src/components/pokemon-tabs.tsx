import { useState, Activity, Suspense } from "react";
import { NonSuspendingPokemonCard, SuspendingPokemonCard } from "./pokemon-card";

const POKEMON_TABS = [
  { id: "bulbasaur", label: "Bulbasaur" },
  { id: "charmander", label: "Charmander" },
  { id: "squirtle", label: "Squirtle" },
] as const;

interface PokemonTabsProps {
  mode: "suspending" | "non-suspending";
}

export function PokemonTabs({ mode }: PokemonTabsProps) {
  const [activePokemon, setActivePokemon] = useState<string>("bulbasaur");

  const PokemonComponent = mode === "suspending" ? SuspendingPokemonCard : NonSuspendingPokemonCard;
  const useSuspense = mode === "suspending";

  const content = (
    <>
      <Activity mode={activePokemon === "bulbasaur" ? "visible" : "hidden"}>
        <PokemonComponent pokemonName="bulbasaur" />
      </Activity>
      <Activity mode={activePokemon === "charmander" ? "visible" : "hidden"}>
        <PokemonComponent pokemonName="charmander" />
      </Activity>
      <Activity mode={activePokemon === "squirtle" ? "visible" : "hidden"}>
        <PokemonComponent pokemonName="squirtle" />
      </Activity>
    </>
  );

  return (
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
        {useSuspense ? (
          <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            {content}
          </Suspense>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

