import Pagination from "@/components/Pagination";
import { Metadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: `Google v2 - You searched for ${searchParams.q}`,
  };
}

async function page({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  const url = `https://www.googleapis.com/customsearch/v1?fields=searchInformation,queries,items(title,link,snippet)
  &key=${process.env.SEARCH_KEY}&cx=${process.env.SEARCH_ID}&q=${searchParams.q}&start=${searchParams.start}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log(data.queries?.nextPage?.[0].startIndex);
  

  return (
    <div className="dark:text-white container flex flex-col px-4 py-6 mx-auto">
      <p className="text-sm font-semibold">
        About {data.searchInformation?.formattedTotalResults} results ({" "}
        {data.searchInformation?.formattedSearchTime} seconds)
      </p>
      <div className="flex flex-col mt-5 gap-5">
        {data.items?.map(
          (
            s: { link: string; title: string; snippet: string },
            i: React.Key | null | undefined
          ) => {
            return (
              <div key={i}>
                <h2 className="text-lg font-semibold">
                  <a href={s.link} target="_blank">
                    {s.title}
                  </a>
                </h2>
                <small className="dark:text-gray-300">{s.link}</small>
                <p className="text-sm">{s.snippet}</p>
              </div>
            );
          }
        )}
      </div>
      <Pagination
        next={data.queries?.nextPage?.[0].startIndex}
        prev={data.queries?.previousPage?.[0].startIndex}
      />
    </div>
  );
}

export default page;
