const ButtonIndex = ({ numPagina, filterByPage, currentPage }) => {


  const handleClick = () => {
  filterByPage()
  }

  return (
    <button className={currentPage === numPagina? "bg-amber-300": ""} onClick={()=> handleClick()}>
      {numPagina}
    </button>
  );
};

export default ButtonIndex;