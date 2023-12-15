import { useState } from "react";
import { darumas, Daruma } from "../types";
import { validateEmail } from '@daruma-board/web/design-system';



export const useNewGoalForm = () => {

    const darumasArray = Object.values(darumas);
    const localEmail = localStorage.getItem("localEmail") || "";
    const [daruma, setDaruma] = useState<Daruma>(darumasArray[0]);
    const [goal, setGoal] = useState<string>("");
    const [email, setEmail] = useState<string>(localEmail);
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [notes, setNotes] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [validated, setValidated] = useState<boolean>(false);
    
    const handleChangeDaruma = (color: string) => {
        const selectedDaruma = darumasArray.find(
        (daruma) => daruma.color === color
        );
        if (selectedDaruma) {
        setDaruma(selectedDaruma);
        }
    };
    const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setNotes(event.target.value);
        
      }
    const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoal(event.target.value);
      }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
      }
      const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(event.target.value);
        setDueDate(newDate);
      };

    const handleSubmit = async () => {
        setLoading(true);
        setValidated(true);
    
        // Validate
        if (!goal) {
        alert("Goal is required");
        setLoading(false);
        return;
        }
    
        if (!email) {
        alert("Email is required");
        setLoading(false);
        return;
        }
    
        if (!validateEmail(email)) {
        alert("Email is invalid");
        setLoading(false);
        return;
        }
    
        if (!dueDate) {
        alert("Due Date is required");
        setLoading(false);
        return;
        }
    };

        return {
            handleChangeDaruma,
            handleNotesChange,
            handleSubmit,
            handleGoalChange,
            handleEmailChange,
            handleDueDateChange,

          };
        };