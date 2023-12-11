import { useEffect, useState } from "react";
import StepsLayout from "./StepsLayout";
import { stepsHeadings } from "./constants";
import { useListingStore } from "./listing-store";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { ApiResponse } from "@/typing/api";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function PropertyDescription() {
  const { setPropertyDescription, listingData } = useListingStore();

  const handleNext = () => {
    if (!listingData?.propertyDescription) return false;
    return true;
  };

  return (
    <StepsLayout
      heading={stepsHeadings.propertyDescription}
      handleNext={handleNext}
      nextBtn={{
        disabled: !listingData?.propertyDescription,
      }}
    >
      <div className="mt-10 w-full flex flex-col items-center max-w-[742px] mx-auto flex-1">
        <div>
          <TinyEditor
            listingData={listingData}
            setPropertyDescription={setPropertyDescription}
          />
        </div>
      </div>
    </StepsLayout>
  );
}

type PropertyDescriptionProps = {
  listingData: IListingData;
  setPropertyDescription: (value: string) => void;
};
// type DescriptionResponse = {
//   data: string;
// };

// function TinyEditor(props: PropertyDescriptionProps) {
//   const { setPropertyDescription, listingData } = props;
//   const [data, setData] = useState<any>(null);

//   // States for TinyMCE editor
//   const [text, setText] = useState("");
//   const [value, setValue] = useState("<p>TinyMCE</p>");

//   // State to store API data
//   // const [data, setData] = useState<any>(null);
//   // State to handle loading state
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   // State to handle errors
//   const [error, setError] = useState<string | null>(null);

//   type DescriptionResponse = {
//     data: string;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //API call
//         const response = await axios.post<ApiResponse<DescriptionResponse>>(
//           "/api/description",
//           listingData
//         );
//         // console.log(response.data.data);
//         setData(response.data);
//         // console.log(listingData);
//       } catch (err) {
//         setError("An error occurred");
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (!listingData.propertyDescription) {
//       console.log("desc--", listingData.propertyDescription);
//       console.log(!listingData.propertyDescription);
//       fetchData();
//     }
//   }, []);

//   if (isLoading) return <div>Gernating AI description...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <>
//         <Editor
//           apiKey={"kyp2zmkihb1eh4w8t3hcmvqqj3hywru15n2fl94638bnbqpd"}
//           onEditorChange={(newValue, editor) => {
//             setValue(newValue);
//             setText(editor.getContent({ format: "text" }));
//             setPropertyDescription(text);
//           }}
//           initialValue={data && data.data}
//           init={{
//             min_height: 200,
//             max_height: 500,
//             resize: true,
//           }}
//         />
//       </>
//     </div>
//   );
// }

function TinyEditor(props: PropertyDescriptionProps) {
  const { setPropertyDescription, listingData } = props;
  // const [text, setText] = useState("");
  // const [text, setText] = useState("");

  const getResponse = async () => {
    try {
      //API call
      const response = await axios.post<ApiResponse<string>>(
        "/api/description",
        listingData
      );
      const description = response.data.data;

      if (description !== undefined && description !== null) {
        // Check if the description is not undefined or null
        setPropertyDescription(description);
      } else {
        console.error("Invalid or missing description in the API response.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (listingData.propertyDescription) {
    return (
      <>
        <Editor
          apiKey={"rzwv8zyct27dwot2j326c3vq80zrp93068xevo37sa211et3"}
          onEditorChange={(newValue, editor) => {
            // setValue(newValue);
            // setText(editor.getContent({ format: "text" }));
            // console.log(text);
            setPropertyDescription(editor.getContent({ format: "text" }));
            // console.log("--", listingData.propertyDescription);
          }}
          initialValue={listingData?.propertyDescription}
          init={{
            min_height: 200,
            max_height: 500,
            resize: true,
          }}
        />
      </>
    );
  } else {
    return (
      <>
        <Button
          variant="primary"
          className={cn(
            "rounded-full w-auto px-8",
            "get-description opacity-70"
          )}
          onClick={getResponse}
        >
          Gernate AI description
        </Button>
      </>
    );
  }
}
