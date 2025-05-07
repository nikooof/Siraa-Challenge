import { WHITE_COLOR } from "../constants";

interface CacheProps {
  isCached: boolean;
}

export function CacheBanner({ isCached }: CacheProps) {
  return (
    <div
      style={{
        padding: 12,
        background: "#A0AEC0",
        borderRadius: 4,
        marginBottom: 15,
        opacity: isCached ? 1 : 0,
        transition: "opacity .5s ease-in-out",
        color: WHITE_COLOR,
      }}
    >
      Data loaded from cache!
    </div>
  );
}
