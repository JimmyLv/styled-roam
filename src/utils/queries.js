//some stats based on work of zsolt: https://roamresearch.com/#/app/Zsolt-Blog/page/WUn5PuTDV

export const queryNonCodeBlocks = `[:find (count ?s) . :with ?e  :where [?e :block/string ?s]  
					(not (or [(clojure.string/starts-with? ?s "${String.fromCharCode(
            96,
            96,
            96
          )}")] 
									 [(clojure.string/starts-with? ?s "{{")]
 	 								 [(clojure.string/starts-with? ?s "<%")]
									 [(clojure.string/starts-with? ?s"> ")]
									 [(clojure.string/starts-with? ?s"[[>]] ")]										 
  								 [(clojure.string/starts-with? ?s ":q ")]))]`;

export const queryMinDate =
  "[:find (min ?date) . :where [?e :node/title ?name] [?e :create/time ?date] ]";

export const queryMinDateBlock = (min_date) =>
  `[:find (pull ?e [*]) :where [?e :node/title ?name] [?e :create/time ${min_date}]]`;

export const queryCurrentActiveBlockUID = () => {
  // if (document.activeElement.localName == "textarea")
  //   return document.activeElement.id.slice(-9);
  const currentBlock = document.querySelector(
    ".roam-toolkit-block-mode--highlight"
  );
  if (currentBlock) {
    return {
      uid: currentBlock.id.slice(-9),
      username: document
        .querySelector("[data-edit-display-name]")
        ?.getAttribute("data-edit-display-name"),
      tags:
        JSON.parse(
          currentBlock.parentElement?.parentElement?.getAttribute(
            "data-page-links"
          )
        ) || [],
    };
  } else return null;
};

export const getBlockInfoByUID = async (
  uid,
  withChildren = false,
  withParents = false
) => {
  try {
    let q = `[:find (pull ?page
                     [:node/title :block/string :block/uid :block/heading :block/props 
                      :entity/attrs :block/open :block/text-align :children/view-type
                      :block/order :edit/time :user/display-name
                      ${withChildren ? "{:block/children ...}" : ""}
                      ${withParents ? "{:block/parents ...}" : ""}
                     ])
                  :where [?page :block/uid "${uid}"]  ]`;
    var results = await window.roamAlphaAPI.q(q);
    if (results.length == 0) return null;
    return results[0][0];
  } catch (e) {
    return null;
  }
};
