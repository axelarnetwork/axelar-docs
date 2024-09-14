import React from "react";
import type { Navigation } from "../../utils/generateNavigation";

const mainNav = ["Dev", "Validator", "Node"];
const DocsNavigation = ({ nav }: { nav: Navigation[] }) => {
  const [current, setCurrent] = React.useState("Dev");
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center divide-x divide-gray-700">
        {mainNav?.map((item) => {
          return (
            <button
              onClick={() => setCurrent(item)}
              className={` px-5 py-3  ${
                item === current ? "bg-blue-500" : "bg-black text-white"
              }`}
              key={item}
            >
              {item}
            </button>
          );
        })}
      </div>
      <Nav nav={nav?.filter((item) => item.title === current)} index={0} />

      <p className="font-bold text-2xl py-10">Others</p>
      <Nav
        nav={nav?.filter((item) => !mainNav?.includes(item.title))}
        index={0}
      />
    </div>
  );
};

export default DocsNavigation;

const Nav = ({ nav, index }: { nav: Navigation[]; index: number }) => {
  return (
    <div
      key={`index + ${Math.random()} + $`}
      style={{
        paddingLeft: `${index * 20}px`,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      className="mt-3"
    >
      {nav?.map((item, i) => {
        return item.children ? (
          <div key={i}>
            <p
              className="font-bold flex gap-2  border-b "
              style={{
                color: index === 0 ? "blue" : "black",
              }}
            >
              {item.title}

              <svg
                className="-rotate-90"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66667 10H13.3333M6.66667 10L10 13.3333M6.66667 10L10 6.66667"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </p>
            <Nav nav={item.children} index={index + 1} />
          </div>
        ) : (
          <a
            key={i}
            href={`/${item.href}/`}
            className="underline text-blue-500"
          >
            {item.title}
          </a>
        );
      })}
    </div>
  );
};
