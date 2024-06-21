import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useScrollToTop = () => {
    const params = useParams();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [params]);
};

export default useScrollToTop;