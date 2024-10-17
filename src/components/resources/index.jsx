import resources from "../../data/resources.json";
import Copy from "../copy";

const COLUMNS = [
  {
    id: "name",
    className: "align-top whitespace-nowrap font-semibold pt-3.5",
  },
  {
    id: "value",
  },
];

export default ({ environment = "mainnet" }) => {
  const _resources = resources?.[environment] || [];

  return (
    <div className="w-full overflow-x-auto">
      <table className="border border-border ">
        <tbody>
          {_resources.map((r, i) => {
            return (
              <tr key={i} className="border-none border-b">
                {COLUMNS.map((c, j) => {
                  const { id, className } = { ...c };

                  const data = r?.[id];

                  return (
                    <td
                      key={j}
                      scope="col"
                      className={`${
                        i % 2 === 0
                          ? "bg-background-neutral"
                          : "bg-background-neutral-dark"
                      } ${
                        i === _resources.length - 1
                          ? j === 0
                            ? "rounded-bl-lg"
                            : j === COLUMNS.length - 1
                              ? "rounded-br-lg"
                              : ""
                          : ""
                      } border-none whitespace-nowrap py-3 px-4 ${
                        className || ""
                      }`}
                    >
                      {id === "value" ? (
                        <div className="flex flex-wrap gap-y-1 gap-x-3">
                          {(data || []).map((v, k) => {
                            const { title, value } = { ...v };

                            const is_external = !value?.startsWith("/");

                            return (
                              <div key={k} className="flex gap-2">
                                <a href={value} className="text-primary ">
                                  {title || value}
                                </a>
                                {
                                  <Copy
                                    size={20}
                                    hide={true}
                                    value={value}
                                    className="link-text-icon"
                                  />
                                }
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        data
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
