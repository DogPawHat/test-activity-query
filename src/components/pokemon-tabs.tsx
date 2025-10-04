import { Activity, Suspense } from "react";
import { Tabs, TabsPanel, TabsList, TabsTrigger } from "./ui/tabs";
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

  const renderActivityTab = (tab: (typeof POKEMON_TABS)[number]) => (
    <Activity mode={activePokemon === tab.id ? "visible" : "hidden"}>
      {/* Always mount the tab content, let activity handle the visibility */}
      <TabsPanel value={tab.id} keepMounted>
        <PokemonComponent pokemonName={tab.id} />
      </TabsPanel>
    </Activity>
  );

  const renderNonActivityTab = (tab: (typeof POKEMON_TABS)[number]) => (
    <TabsPanel key={tab.id} value={tab.id}>
      <PokemonComponent pokemonName={tab.id} />
    </TabsPanel>
  );

  return (
    <Tabs
      value={activePokemon}
      onValueChange={(value) => {
        setActivePokemon(value);
      }}
    >
      <TabsList>
        {POKEMON_TABS.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {suspenseEnabled ? (
        <Suspense fallback={<SkeletonPokemonCard />}>
          {POKEMON_TABS.map((tab) =>
            activityEnabled ? renderActivityTab(tab) : renderNonActivityTab(tab)
          )}
        </Suspense>
      ) : (
        <>
          {POKEMON_TABS.map((tab) =>
            activityEnabled ? renderActivityTab(tab) : renderNonActivityTab(tab)
          )}
        </>
      )}
    </Tabs>
  );
}
