import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "../../core/json/siderbar_data";

const Sidebar = () => {
  const Location = useLocation();

  const [subOpen, setSubopen] = useState("");
  const [subsidebar, setSubsidebar] = useState("");

  const toggleSidebar = (title) => {
    if (title === subOpen) {
      setSubopen("");
    } else {
      setSubopen(title);
    }
  };

  const toggleSubsidebar = (subitem) => {
    if (subitem === subsidebar) {
      setSubsidebar("");
    } else {
      setSubsidebar(subitem);
    }
  };

  const handleLinkClick = (e, link) => {
    if (link === "#") {
      e.preventDefault();
      console.log("Link prevented for #");
    }
  };

  return (
    <div>
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {SidebarData?.map((mainLabel, index) => (
                  <li className="submenu-open" key={index + 1}>
                    <h6 className="submenu-hdr">{mainLabel?.label}</h6>
                    <ul>
                      {mainLabel?.submenuItems?.map((title, i) => {
                        let link_array = [];
                        title?.submenuItems?.map((link) => {
                          link_array?.push(link?.link);
                          if (link?.submenu) {
                            link?.submenuItems?.map((item) => {
                              link_array?.push(item?.link);
                            });
                          }
                          return link_array;
                        });
                        title.links = link_array;
                        return (
                          <li className="submenu" key={i}>
                            <Link
                              to={title?.link}
                              onClick={(e) => {
                                handleLinkClick(e, title?.link);
                                toggleSidebar(title?.label);
                              }}
                              className={`${
                                subOpen === title?.label ? "subdrop" : ""
                              } ${
                                title?.link === Location.pathname
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {title?.icon}
                              <span>{title?.label}</span>
                              <span
                                className={title?.submenu ? "menu-arrow" : ""}
                              />
                            </Link>
                            <ul
                              style={{
                                display:
                                  subOpen === title?.label ? "block" : "none",
                              }}
                            >
                              {title?.submenuItems?.map(
                                (item, titleIndex) => (
                                  <li
                                    className="submenu submenu-two"
                                    key={titleIndex}
                                  >
                                    <Link
                                      to={item?.link}
                                      className={
                                        item?.submenuItems
                                          ?.map((link) => link?.link)
                                          .includes(Location.pathname) ||
                                        item?.link === Location.pathname
                                          ? "active"
                                          : ""
                                      }
                                      onClick={(e) => {
                                        handleLinkClick(e, item?.link);
                                        toggleSubsidebar(item?.label);
                                      }}
                                    >
                                      {item?.label}
                                      <span
                                        className={
                                          item?.submenu ? "menu-arrow" : ""
                                        }
                                      />
                                    </Link>
                                    <ul
                                      style={{
                                        display:
                                          subsidebar === item?.label
                                            ? "block"
                                            : "none",
                                      }}
                                    >
                                      {item?.submenuItems?.map(
                                        (items, titleIndex) => (
                                          <li key={titleIndex}>
                                            <Link
                                              to={items?.link}
                                              className={`${
                                                subsidebar === items?.label
                                                  ? "submenu-two subdrop"
                                                  : "submenu-two"
                                              } ${
                                                items?.submenuItems
                                                  ?.map((link) => link.link)
                                                  .includes(Location.pathname) ||
                                                items?.link === Location.pathname
                                                  ? "active"
                                                  : ""
                                              }`}
                                              onClick={(e) =>
                                                handleLinkClick(e, items?.link)
                                              }
                                            >
                                              {items?.label}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Sidebar;
