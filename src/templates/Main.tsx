import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

import { classnames } from "tailwindcss-classnames";

import { AppConfig } from "@/utils/AppConfig";

const tabStyle = classnames("text-gray-700", "hover:text-gray-900");

const activeTabStyle = classnames(
  tabStyle,
  "text-gray-900",
  "border-b-2",
  "hover:border-b-2",
  "border-gray-900",
  "hover:border-gray-900"
);

const activeTab = (isActive: boolean) =>
  classnames(tabStyle, {
    [activeTabStyle]: isActive,
    ["border-none"]: !isActive,
  });

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const isActiveTab = (path: string, currentPath: string) => path === currentPath;

const Main = (props: IMainProps) => {
  const router = useRouter();
  const currentPath = router.pathname.replace(/^\//, "");

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto max-w-screen-md">
        <div className="border-b border-gray-300">
          <div className="pt-16 pb-8">
            <div className="text-3xl font-bold text-gray-900">
              {AppConfig.title}
            </div>
            <div className="text-xl">{AppConfig.description}</div>
          </div>
          <div>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6">
                <Link href="/">
                  <a
                    className={activeTab(isActiveTab("", currentPath))}
                  >
                    Register
                  </a>
                </Link>
              </li>
              <li className="mr-6">
                <Link href="/dashboard/">
                  <a
                    className={activeTab(isActiveTab("dashboard", currentPath))}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>
              <li className="mr-6">
                <Link href="/about/">
                  <a
                    className={activeTab(isActiveTab("about", currentPath))}
                  >
                    About
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="content py-5 text-xl">{props.children}</div>

        <div className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{" "}
          <span role="img" aria-label="Love">
            ♥
          </span>{" "}
          by Ayudha Foundation.
          {/* <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a> */}
          {/*
           * PLEASE READ THIS SECTION
           * We'll really appreciate if you could have a link to our website
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * Thank you for your support it'll mean a lot for us.
           */}
        </div>
      </div>
    </div>
  );
};

export { Main };
