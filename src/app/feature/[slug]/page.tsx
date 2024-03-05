import { Metadata } from "next";
import Link from "next/link";
import DemoPlaceholder from "@/components/DemoPlaceholder";
import FeatureMetrix, { MAIN_FEATURES, FeatureItem } from "@/components/FeatureMetrix";
import LatestVersion from "@/components/LatestVersion";
import { getMetadata } from "@/utils/metadata";

interface Props {
  params: { slug: string };
}

const Page = ({ params }: Props) => {
  const feature = MAIN_FEATURES.find((feature) => feature.slug === params.slug) as FeatureItem;

  return (
    <>
      <div className="mt-6 sm:mt-12 w-full flex flex-col justify-start items-center">
        <LatestVersion />
      </div>
      <div className="w-full flex flex-col justify-center items-center sm:px-16">
        <feature.icon strokeWidth="1" className="h-14 mt-4 mb-2 sm:h-20 w-auto text-gray-500" />
        <h1 className="w-full text-center text-2xl sm:text-4xl font-bold mt-4 mb-4">{feature.title}</h1>
        <h2 className="w-full text-base sm:text-lg text-gray-500 text-center mb-2">{feature.description}</h2>
      </div>
      <div className="w-full flex flex-row justify-center items-center space-x-2 py-4">
        <Link target="_blank" href="https://github.com/usememos/memos">
          <img alt="GitHub stars" src="https://img.shields.io/github/stars/usememos/memos?logo=github" />
        </Link>
        <Link target="_blank" href="https://hub.docker.com/r/neosmemo/memos">
          <img alt="Docker" src="https://img.shields.io/docker/pulls/neosmemo/memos.svg?logo=docker" />
        </Link>
        <Link target="_blank" href="https://discord.gg/tfPJa4UmAv">
          <img alt="Discord" src="https://img.shields.io/badge/discord-chat-5865f2?logo=discord" />
        </Link>
      </div>
      <DemoPlaceholder />
      <FeatureMetrix />
    </>
  );
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const feature = MAIN_FEATURES.find((feature) => feature.slug === params.slug) as FeatureItem;
  return getMetadata({
    title: feature.title + " - Memos",
    description: feature.description,
    pathname: `/feature/${feature.slug}`,
  });
};

export const generateStaticParams = () => {
  return MAIN_FEATURES.map((feature) => {
    return {
      slug: feature.slug,
    };
  });
};

export default Page;
