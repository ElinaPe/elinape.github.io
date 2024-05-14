import React from 'react';
import resultsService from '../services/resultsService'; 

interface DeleteButtonProps {
    id: number;
    onSuccessfulDelete: () => void;
}

const DeleteButton : React.FC<DeleteButtonProps> = ({ id, onSuccessfulDelete }) => {


    const handleDeleteClick = () => {
        if (window.confirm("Ootko varma?")) {
            handleDelete();
        }
    };

  const handleDelete = () => {
    resultsService.deleteResultList(id)
      .then(() => {
        onSuccessfulDelete();
        alert('Tiedot poistettu.');
      })
      .catch(error => {
        console.error('Poisto epäonnistui:', error);
        alert('Poisto epäonnistui. Katso lisätietoja konsolista.');
      });
  };

  return (
    <button onClick={handleDeleteClick} className="delete-button">
      Poista
    </button>
  );
};

export default DeleteButton;