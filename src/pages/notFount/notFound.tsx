import { type FC } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h3>Страница не найдена. Ошибка 404.</h3>
      <button onClick={() => navigate(-1)}>Назад</button>
    </>
  );
};
