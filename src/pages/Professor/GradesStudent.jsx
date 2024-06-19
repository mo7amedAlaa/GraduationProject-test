import MainLayout from "../../component/Main/MainLayout";
import { IoMdAddCircleOutline } from "react-icons/io";
import { DataGrid } from "@mui/x-data-grid";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { useEffect } from "react";
import { UseApiRequest } from "../../Hooks/RestApi";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "كود المادة", width: 130 },
  { field: "description", headerName: "اسم المادة", width: 130 },
  { field: "price", headerName: "عدد الساعات", width: 130 },
  { field: "category", headerName: "الدرجة العظمي", width: 130 },
  { field: "rating", headerName: "الدرجة الصغري", width: 130 },
];
const rows = [
  {
    id: 1,
    title: "ggffg",
    description: "fggfgffg",
    price: 5,
    category: 100,
    rating: 45,
  },
];
// const {
//   data: courses,
//   loading: GetLoad,
//   error: GetError,
//   callApi,
// } = UseApiRequest(
//   "/courses",
//   "GET",
//   null,
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vNTE3ZC0xOTctMzMtMTE4LTExOC5uZ3Jvay1mcmVlLmFwcC9hcGkvYXV0aC9sb2dpbnN0dWRlbnQiLCJpYXQiOjE3MTgyMTYxNTIsImV4cCI6MTcxODU3NjE1MiwibmJmIjoxNzE4MjE2MTUyLCJqdGkiOiJUUlpBdjVabnkyVGZBWEtXIiwic3ViIjoiMzUiLCJwcnYiOiI5YzQyOWU2YTYwY2Q1Mjg1NDczZjJjOGJjNzAxZWMwOTQ4ZGY0ZDhjIn0.68p9K_BWaA30wRVLCMRhKdrloXazPBEyaOZwgebC91U"
// );


function GradesStudent() {
  const handelSubmit = async (event) => {
    event.preventDefault();
    
    // callApi();
  };
  useEffect(()=>{
    // const res = axios.get("https://28b9-197-162-23-38.ngrok-free.app/api/showcourses")

    //  console.log(res.data)


    
  },[])


  return (
    <div>
      <MainLayout>
        <div>
          <form action="">
            <div>
              <fieldset className="border my-2 border-gray-600 p-3 ">
                <legend>درجات الطالب بالتفصيل </legend>
                <div className="inline-block my-2">
                  <label htmlFor="" className=" mx-5  ">
                    اسم الطالب
                  </label>
                  <input
                    type="text"
                    placeholder="ادخل اسمك الكامل"
                    className="inputStyle p-4 outline-none rounded-md hover:border-main transition-all cursor-pointer"
                  />
                </div>
                <div className="inline-block my-2">
                  <label htmlFor="" className=" mx-5 ">
                    كود الطالب
                  </label>
                  <input
                    type="text"
                    placeholder="ادخل الكود الخاص بك"
                    className="inputStyle p-4 outline-none rounded-md hover:border-main transition-all cursor-pointer"
                  />
                </div>

                <div className="inline-block my-2">
                  <label htmlFor="" className=" mx-5  ">
                    كود المادة
                  </label>
                  <input
                    type="text"
                    placeholder="ادخل كود المادة"
                    className="inputStyle p-4 outline-none rounded-md hover:border-main transition-all cursor-pointer"
                  />
                </div>
                <div className="inline-block my-2">
                  <label htmlFor="" className=" mx-5  ">
                    الدرجة
                  </label>
                  <input
                    type="text"
                    className="inputStyle p-4 outline-none rounded-md hover:border-main transition-all cursor-pointer"
                    placeholder="ادخل الدرجة"
                  />
                </div>
              </fieldset>
            </div>
            <div className="flex justify-center gap-5 mt-1 mb-3">
              <div className="relative ">
                <input
                  type="submit"
                  value={"اضافة"}
                  className="main-btn"
                  onClick={handelSubmit}
                />
                <IoMdAddCircleOutline className=" absolute top-[50%] transform -translate-x-1/2 -translate-y-1/2  right-4" />
              </div>
              <div className="relative">
                <button type="button" className="main-btn ">
                  بحث
                </button>
                <CiSearch className=" absolute top-[50%] transform -translate-x-1/2 -translate-y-1/2  right-4" />
              </div>
            </div>
          </form>
        </div>
        <div className="p-10 container mx-auto">
          <div style={{ height: 400, width: "100%", direction: "ltr" }}>
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default GradesStudent;
