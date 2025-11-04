import { toast } from "sonner";

export const showAPIResponseToastMessage = (result) => {
  if (result?.response?.errors) {
    result?.response?.errors?.forEach(element => {
      toast.error(element.errorTitle, {
        description: element.errorDescription,
      });
    });
  } else {
    toast.success(result.responseMessage, {
      description: result?.response?.message || "Successfully fetched data"
    });
  }
}

// toast("Event has been created", {
//   description: "Sunday, December 03, 2023 at 9:00 AM",
//   action: {
//     label: "Undo",
//     onClick: () => console.log("Undo"),
//   },
// });