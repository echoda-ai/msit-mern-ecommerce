import { useEffect, useState } from "react";
import API from "../state/base";
import { API_ENDPOINTS } from "../configs/apiEndpoints";
import { Link } from "react-router-dom";

export const CategoryList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const categoryLoading = new Array(13).fill(null);

  const getCategories = async () => {
    setIsLoading(true);
    const res = await API.get(API_ENDPOINTS.CATEGORY.GET);
    setCategories(res.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto p-4 flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none">
      {isLoading ? (
        categoryLoading.map((_, index) => (
          <div
            className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
            key={"categoryLoading" + index}
          ></div>
        ))
      ) : categories && categories.length > 0 ? (
        categories.map((c: any) => (
          <Link className="cursor-pointer" key={c?.category} to={""}>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
              <img
                src={c?.productImage[0]}
                alt={c?.category}
                className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
              />
            </div>
            <p className="text-center text-sm md:text-base capitalize">
              {c?.category}
            </p>
          </Link>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};
