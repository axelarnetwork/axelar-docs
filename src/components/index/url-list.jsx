import Link from "next/link";

const items = [
  {
    title: "About Axelar",
    icon: (
      <>
        <div className="flex dark:hidden items-center">
          <img
            src="/logo/logo.png"
            alt=""
            width={24}
            height={24}
          />
        </div>
        <div className="hidden dark:flex items-center">
          <img
            src="/logo/logo_dark.png"
            alt=""
            width={24}
            height={24}
          />
        </div>
      </>
    ),
    url: "/learn",
    external: false,
  },
  {
    title: "Whitepaper",
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"></path></svg>
    ),
    url: "https://axelar.network/axelar_whitepaper.pdf",
    external: true,
  },
  {
    title: "Resources",
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z"></path><path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z"></path></svg>
    ),
    url: "/resources",
    external: false,
  },
];

export default () => {
  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-6">
      {items.map((item, i) => {
        const {
          icon,
          title,
          url,
          external,
        } = { ...item };
        const element = (
          <div className="card-index">
            <div className="flex items-center space-x-3">
              {icon}
              <span className="text-base font-semibold">
                {title}
              </span>
            </div>
          </div>
        );

        return external ?
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopenner noreferrer"
            className="no-underline text-black dark:text-white"
          >
            {element}
          </a>
          :
          <Link
            key={i}
            href={url}
          >
            <a className="no-underline text-black dark:text-white">
              {element}
            </a>
          </Link>
      })}
    </div>
  );
};
