import React from "react";
import { useRecoilState } from "recoil";
import {
    defaultEmailInviteModal,
    emailInviteModal,
} from "../../recoil/modal/emailInvite"
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type ModalEmailInviteInputs = {
    email: string;
};

export const ModalEmailInvite = () => {
    // REACT HOOK FORMS
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<ModalEmailInviteInputs>();

    const [emailInviteModalShow, setEmailInviteModalShow] =
        useRecoilState(emailInviteModal);

    const handleModalRequest: SubmitHandler<ModalEmailInviteInputs> = async (
        { email }
    ) => {
        console.log("email: ", email)

        handleModalReset();
    };

    const handleModalReset = () => {
        reset();
        clearErrors();
        setEmailInviteModalShow(defaultEmailInviteModal)
    };

    return (
        <>
            {emailInviteModalShow.isOpen ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5">
                                    <h3 className="text-lg font-semibold">Invite a friend!</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={handleModalReset}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            <FontAwesomeIcon className="text-black" icon={faX} />
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-6 flex-auto">
                                    <form onSubmit={handleSubmit(handleModalRequest)}>
                                        <label className="block">
                                            <span className="block text-md font-medium">
                                                Email
                                            </span>
                                        </label>
                                        <input
                                            {...register("email")}
                                            type="text"
                                            placeholder="email"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                        />
                                        <div className="text-center block p-6">
                                            <button
                                                className="main-Btn hover:opacity-80"
                                                type="submit"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )

} 
