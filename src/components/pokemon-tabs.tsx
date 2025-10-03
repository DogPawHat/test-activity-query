import { Activity, Suspense } from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";

import { useActivityEnabled, useSuspenseEnabled } from "../lib/utils";
import {
  NonSuspendingPokemonCard,
  SkeletonPokemonCard,
  SuspendingPokemonCard,
} from "./pokemon-card";

const POKEMON_TABS = [
  { id: "bulbasaur", label: "Bulbasaur" },
  { id: "charmander", label: "Charmander" },
  { id: "squirtle", label: "Squirtle" },
] as const;

export function PokemonTabs() {
  const [activePokemon, setActivePokemon] = useQueryState(
    "activePokemon",
    parseAsStringLiteral(["bulbasaur", "charmander", "squirtle"])
      .withDefault("bulbasaur")
      .withOptions({
        clearOnDefault: false,
      })
  );
  const [activityEnabled] = useActivityEnabled();
  const [suspenseEnabled] = useSuspenseEnabled();

  const PokemonComponent = suspenseEnabled
    ? SuspendingPokemonCard
    : NonSuspendingPokemonCard;

  const content = activityEnabled ? (
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
  ) : (
    <>
      {activePokemon === "bulbasaur" && (
        <PokemonComponent pokemonName="bulbasaur" />
      )}
      {activePokemon === "charmander" && (
        <PokemonComponent pokemonName="charmander" />
      )}
      {activePokemon === "squirtle" && (
        <PokemonComponent pokemonName="squirtle" />
      )}
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
        {suspenseEnabled ? (
          <Suspense fallback={<SkeletonPokemonCard />}>{content}</Suspense>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
