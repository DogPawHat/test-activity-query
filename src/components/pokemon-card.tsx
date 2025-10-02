import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

interface PokemonCardProps {
  pokemonName: string;
}

async function fetchPokemon(name: string): Promise<PokemonData> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch pokemon");
  }
  return response.json();
}

// Non-Suspending version - handles loading/error states internally
export function NonSuspendingPokemonCard({ pokemonName }: PokemonCardProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon-non-suspending", pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
  });

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <p className="text-destructive">
            Error: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return <PokemonCardContent data={data} />;
}

// Suspending version - throws promise to nearest Suspense boundary
export function SuspendingPokemonCard({ pokemonName }: PokemonCardProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["pokemon-suspending", pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
  });

  return <PokemonCardContent data={data} />;
}

// Shared component for rendering Pokemon data
function PokemonCardContent({ data }: { data: PokemonData }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl capitalize">{data.name}</CardTitle>
        <CardDescription>
          #{data.id.toString().padStart(3, "0")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
            className="w-48 h-48 object-contain"
          />
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            {data.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize"
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="text-lg font-semibold">{data.height / 10}m</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="text-lg font-semibold">{data.weight / 10}kg</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">Abilities</p>
            <div className="flex flex-wrap gap-2">
              {data.abilities.map((abilityInfo) => (
                <span
                  key={abilityInfo.ability.name}
                  className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs capitalize"
                >
                  {abilityInfo.ability.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">Base Stats</p>
            <div className="space-y-1">
              {data.stats.map((statInfo) => (
                <div
                  key={statInfo.stat.name}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs w-32 capitalize text-muted-foreground">
                    {statInfo.stat.name.replace("-", " ")}
                  </span>
                  <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          (statInfo.base_stat / 255) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium w-8 text-right">
                    {statInfo.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Backward compatibility: export SuspendingPokemonCard as PokemonCard for existing code
export const PokemonCard = SuspendingPokemonCard;
