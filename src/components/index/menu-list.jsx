import Link from "next/link";
import { RiCodeFill, RiRadarFill, RiSettings4Fill, RiServerFill } from "react-icons/ri";

const items = [
  {
    title: "Developer",
    description: "Use Solidity or JavaScript to send tokens and interact with smart contracts across chains.",
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M23 11.9998L15.9289 19.0708L14.5147 17.6566L20.1716 11.9998L14.5147 6.34292L15.9289 4.92871L23 11.9998ZM3.82843 11.9998L9.48528 17.6566L8.07107 19.0708L1 11.9998L8.07107 4.92871L9.48528 6.34292L3.82843 11.9998Z"></path></svg>
    ),
    url: "/dev/intro",
    external: false,
  },
  {
    title: "Satellite user",
    description: "Satellite is a web app built on top of the Axelar network. Use it to transfer assets from one chain to another.",
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.3685 4.39825L10.8842 10.4332L12.6163 11.4332L16.1006 5.39825C20.27 8.1702 22.4058 12.4773 20.6605 15.5002C18.8003 18.7223 13.4717 18.8552 8.75027 16.1294C4.0289 13.4035 1.47976 8.72227 3.34002 5.50019C5.08527 2.47733 9.88324 2.17339 14.3685 4.39825ZM15.8842 1.77295L17.6163 2.77295L16.1163 5.37103L14.3842 4.37103L15.8842 1.77295ZM6.73233 20.0002H17.0003V22.0002H5.01761C4.94008 22.0016 4.86194 21.994 4.78481 21.977C4.77025 21.9737 4.7558 21.9702 4.74147 21.9664C4.6589 21.9442 4.57784 21.911 4.50028 21.8662C4.47106 21.8493 4.44301 21.8312 4.41616 21.812C4.30161 21.7294 4.20524 21.6232 4.1342 21.5004C4.06328 21.3774 4.01939 21.2406 4.00518 21.0999C4.00446 21.0926 4.00381 21.0852 4.00325 21.0779C3.98786 20.8832 4.02924 20.6821 4.13425 20.5002L6.38425 16.6031L8.1163 17.6031L6.73233 20.0002Z"></path></svg>
    ),
    url: "/resources/satellite",
    external: false,
  },
  {
    title: "Node operator",
    description: "Learn how to run a node on the Axelar network",
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.33409 4.54491C6.3494 3.63637 7.55145 2.9322 8.87555 2.49707C9.60856 3.4128 10.7358 3.99928 12 3.99928C13.2642 3.99928 14.3914 3.4128 15.1245 2.49707C16.4486 2.9322 17.6506 3.63637 18.6659 4.54491C18.2405 5.637 18.2966 6.90531 18.9282 7.99928C19.5602 9.09388 20.6314 9.77679 21.7906 9.95392C21.9279 10.6142 22 11.2983 22 11.9993C22 12.7002 21.9279 13.3844 21.7906 14.0446C20.6314 14.2218 19.5602 14.9047 18.9282 15.9993C18.2966 17.0932 18.2405 18.3616 18.6659 19.4536C17.6506 20.3622 16.4486 21.0664 15.1245 21.5015C14.3914 20.5858 13.2642 19.9993 12 19.9993C10.7358 19.9993 9.60856 20.5858 8.87555 21.5015C7.55145 21.0664 6.3494 20.3622 5.33409 19.4536C5.75952 18.3616 5.7034 17.0932 5.0718 15.9993C4.43983 14.9047 3.36862 14.2218 2.20935 14.0446C2.07212 13.3844 2 12.7002 2 11.9993C2 11.2983 2.07212 10.6142 2.20935 9.95392C3.36862 9.77679 4.43983 9.09388 5.0718 7.99928C5.7034 6.90531 5.75952 5.637 5.33409 4.54491ZM13.5 14.5974C14.9349 13.7689 15.4265 11.9342 14.5981 10.4993C13.7696 9.0644 11.9349 8.57277 10.5 9.4012C9.06512 10.2296 8.5735 12.0644 9.40192 13.4993C10.2304 14.9342 12.0651 15.4258 13.5 14.5974Z"></path></svg>
    ),
    url: "/node/join",
    external: false,
  },
  {
    title: "Validator",
    description: "Axelar validators facilitate cross-chain connections",
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 3H20C20.5523 3 21 3.44772 21 4V11H3V4C3 3.44772 3.44772 3 4 3ZM3 13H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V13ZM7 16V18H10V16H7ZM7 6V8H10V6H7Z"></path></svg>
    ),
    url: "/validator/setup/overview",
    external: false,
  }
];

export default () => {
  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 my-4">
      {items.map((item, i) => {
        const {
          icon,
          title,
          description,
          url,
          external,
        } = { ...item };
        const link = (
          <div className="flex items-center text-blue-500 dark:text-blue-600 space-x-1.5">
            <span>
              Get Started
            </span>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </div>
        );
        const element = (
          <div className="card-index h-full flex flex-col justify-between">
            <div className="mb-2">
              <div className="flex items-center space-x-3">
                {icon}
                <span className="text-base font-semibold">
                  {title}
                </span>
              </div>
              <div className="text-gray-500 dark:text-gray-400 mt-4">
                {description}
              </div>
            </div>
            {link}
          </div>
        );

        return (
          external ?
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
        );
      })}
    </div>
  );
};