"use client";

import userData from "@/data/userData.json";
import React from "react";
import Image from "next/image";

const Home = () => {
  const [users, setUsers] = React.useState(userData.usersData);
  const [selected, setSelected] = React.useState([]);
  const [val, setVal] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  // Function to handle selecting a user from the list
  const handleSelectUser = React.useCallback(
    (user) => {
      setSelected((prev) => [...prev, user]); // Add user to selected list
      const remainUsers = users.filter((item) => item.id !== user.id); // Remove user from available list
      setUsers(remainUsers);
      setVal("");
    },
    [setSelected, setUsers, users]
  );

  // Function to handle removing a user from the selected list
  const handleRemoveUser = React.useCallback(
    (user) => {
      const remainUsers = selected.filter((item) => item.id !== user.id); // Remove user from selected list
      setSelected(remainUsers);
      setUsers((prev) => [...prev, user]); // Add user back to available list
    },
    [setSelected, setUsers, selected]
  );

  // Filtered users based on search input, using useMemo for memoization
  const filteredUsers = React.useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(val.toLowerCase())
    );
  }, [users, val]);

  // handle closing the user list when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#container") &&
        !event.target.closest("#listContainer")
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <main className="grid place-items-center my-10 w-full max-w-3xl mx-auto">
      <section className="w-full">
        <h1 className="text-center mb-10 text-blue-600">Pick Users</h1>

        <section>
          <ul className="flex items-center flex-wrap gap-2 w-full border-b-2 border-b-blue-800">
            {selected.map((user) => (
              <li
                key={user.id}
                className="flex items-center gap-1 px-2 py-1 border bg-gray-100 rounded-full mb-1"
              >
                <Image
                  src={user.src}
                  alt={user.name}
                  width={18}
                  height={18}
                  className="aspect-square rounded-full"
                />

                <span className="text-xs">{user.name}</span>
                <button onClick={() => handleRemoveUser(user)} className="ml-1">
                  &#x2715;
                </button>
              </li>
            ))}
            <li className="relative" id="container">
              <input
                type="text"
                value={val}
                onFocus={() => setIsVisible(true)}
                onChange={(e) => setVal(e.target.value)}
                placeholder="Type user name to add"
                className="outline-none p-2"
              />

              {isVisible && users.length > 0 && (
                <div
                  className="border py-4 w-full min-w-max absolute left-0 top-10 bg-white"
                  id="listContainer"
                >
                  <ul className="max-h-60 overflow-y-scroll">
                    {filteredUsers.map((user) => (
                      <li
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className="flex items-center gap-2 hover:bg-slate-100 py-3 px-6 cursor-pointer"
                      >
                        <Image
                          src={user.src}
                          alt={user.name}
                          width={25}
                          height={25}
                          className="aspect-square rounded-full"
                        />
                        <h2>{user.name}</h2>
                        <span className="ml-2 text-gray-500">{user.email}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </section>
      </section>
    </main>
  );
};

export default Home;
