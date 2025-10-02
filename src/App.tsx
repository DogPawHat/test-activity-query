import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { PokemonCard } from "./components/PokemonCard";

function App() {
  const [activePokemon, setActivePokemon] = useState("bulbasaur");

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground p-4">
      <h1 className="text-3xl font-bold mb-6">Pokémon Explorer</h1>

      <Tabs
        value={activePokemon}
        onValueChange={setActivePokemon}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bulbasaur">Bulbasaur</TabsTrigger>
          <TabsTrigger value="charmander">Charmander</TabsTrigger>
          <TabsTrigger value="squirtle">Squirtle</TabsTrigger>
        </TabsList>

        <TabsContent value="bulbasaur" className="mt-4">
          <PokemonCard pokemonName="bulbasaur" />
        </TabsContent>

        <TabsContent value="charmander" className="mt-4">
          <PokemonCard pokemonName="charmander" />
        </TabsContent>

        <TabsContent value="squirtle" className="mt-4">
          <PokemonCard pokemonName="squirtle" />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default App;
