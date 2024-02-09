import dynamic from "next/dynamic";

const Sharesheet = dynamic(() => import("@/components/Sharesheet"), {
  ssr: false,
});

export default function Page(): JSX.Element {
  return <Sharesheet />;
}
