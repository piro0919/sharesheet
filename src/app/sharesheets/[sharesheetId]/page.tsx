import dynamic from "next/dynamic";

const Sharesheet = dynamic(() => import("@/components/Sharesheet"), {
  ssr: false,
});

export type PageProps = {
  params: { sharesheetId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({
  params: { sharesheetId },
}: PageProps): JSX.Element {
  return <Sharesheet sharesheetId={sharesheetId} />;
}
