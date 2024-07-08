import React, { useState } from "react";
import { FaPlus,FaEdit, FaTrashAlt } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ToastContainer, toast, Bounce } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppsIcon from "@mui/icons-material/Apps";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "react-toastify/dist/ReactToastify.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Sidebar from "./sideBar";
import Navbar from "./NavBar";
import ImageModal from "./ImageModal";
import FilterModal from "./FilterModal";
import "../styles/Table.css";


const initialStates = [
  {
    id: "1",
    name: "State 1",
    variants: [
      { id: "1", name: "Variant 1", image: "", description: "", filters: [] },
    ],
  },
];
const initialVariants = [{ id: "1", name: "Variant 1", description: "" }];
const images = [
  { src: "whiteFolar.jpeg", description: "printed frock" },
  { src: "greenFolar.jpeg", description: "10th Grade Marksheet" },
  { src: "lineFolar.jpeg", description: "Photo of Santosh" },
  { src: "pinkFolar.jpeg", description: "Duplicate 10th Grade Certificate" },
  { src: "striped.jpeg", description: "Duplicate 10th Grade Marksheet" },
  { src: "flowerPrint.jpeg", description: "Duplicate Photo of Santosh" },
];



export default function Table() {
  const [states, setStates] = useState(initialStates);
  const [variants, setVariants] = useState(initialVariants);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentVariantIndex, setCurrentVariantIndex] = useState(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState([]);

  const handleOpenMenu = (event, index) => {
    setAnchorEl(event.currentTarget);
    setCurrentVariantIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentVariantIndex(null);
  };

  const handleOpenModal = (stateId, variantId) => {
    setSelectedStateId(stateId);
    setSelectedVariantId(variantId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleImageSelect = (imageSrc, imageDescription) => {
    if (selectedStateId && selectedVariantId) {
      const updatedStates = states.map((state) => {
        if (state.id === selectedStateId) {
          return {
            ...state,
            variants: state.variants.map((variant) =>
              variant.id === selectedVariantId
                ? { ...variant, image: imageSrc, description: imageDescription }
                : variant
            ),
          };
        }
        return state;
      });

      setStates(updatedStates);
      console.log("States after image selection:", updatedStates);
      handleCloseModal();
      toast.success("Variant template updated");
    }
  };

  const handleAddState = () => {
    const newStateId = (states.length + 1).toString();
    const newState = {
      id: newStateId,
      name: `State ${newStateId}`,
      variants: variants.map((v) => ({ ...v, image: "", filters: [] })),
    };
    toast.success("State added");
    setStates([...states, newState]);
  };

  const handleDeleteState = (id) => {
    const updatedStates = states.filter((state) => state.id !== id);
    const reorderedStates = updatedStates.map((state, index) => ({
      ...state,
      id: (index + 1).toString(),
      name: `State ${index + 1}`,
    }));
    setStates(reorderedStates);

    const updatedVariants = variants.map((variant, index) => ({
      ...variant,
      id: (index + 1).toString(),
      name: `Variant ${index + 1}`,
    }));
    setVariants(updatedVariants);

    const updatedStatesWithVariants = reorderedStates.map((state) => ({
      ...state,
      variants: state.variants.map((variant, index) => ({
        ...variant,
        id: (index + 1).toString(),
      })),
    }));
    setStates(updatedStatesWithVariants);
    toast.success("State removed!");
  };

  const handleAddVariant = () => {
    const newVariantId = (variants.length + 1).toString();
    const newVariant = { id: newVariantId, name: `Variant ${newVariantId}` };

    const updatedVariants = [...variants, newVariant];
    setVariants(updatedVariants);

    const updatedStates = states.map((state) => ({
      ...state,
      variants: [
        ...state.variants,
        {
          id: newVariantId,
          name: `Variant ${newVariantId}`,
          image: "",
          filters: [],
        },
      ],
    }));

    setStates(updatedStates);
    toast.success("Variant added");
  };

  const handleDeleteVariant = (variantId) => {
    const updatedVariants = variants.filter(
      (variant) => variant.id !== variantId
    );
    setVariants(updatedVariants);

    const updatedStates = states.map((state) => ({
      ...state,
      variants: state.variants.filter((variant) => variant.id !== variantId),
    }));
    handleCloseMenu();
    setStates(updatedStates);

    const reorderedVariants = updatedVariants.map((variant, index) => ({
      ...variant,
      id: (index + 1).toString(),
      name: `Variant ${index + 1}`,
    }));
    setVariants(reorderedVariants);

    const updatedStatesWithVariants = updatedStates.map((state) => ({
      ...state,
      variants: state.variants.map((variant, index) => ({
        ...variant,
        id: (index + 1).toString(),
      })),
    }));
    setStates(updatedStatesWithVariants);
    toast.success("Variant removed!");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.index === destination.index) return;

    const reorderedStates = Array.from(states);
    const movedState = reorderedStates[source.index];
    reorderedStates.splice(source.index, 1);
    reorderedStates.splice(destination.index, 0, movedState);

    const updatedStates = reorderedStates.map((state, index) => ({
      ...state,
      id: (index + 1).toString(),
      name: `State ${index + 1}`,
    }));

    setStates(updatedStates);
  };

  const handleToggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleOpenFilterModal = (stateId, variantId) => {
    setSelectedStateId(stateId);
    setSelectedVariantId(variantId);
    setFilters([]);
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  const handleAddFilter = () => {
    setFilters([...filters, { id: Date.now().toString(), value: "" }]);
  };

  const handleFilterChange = (id, value) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, value } : filter
      )
    );
  };

  const handleRemoveFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  const handleSaveFilters = () => {
    if (selectedStateId && selectedVariantId) {
      const updatedStates = states.map((state) => {
        if (state.id === selectedStateId) {
          return {
            ...state,
            variants: state.variants.map((variant) =>
              variant.id === selectedVariantId
                ? { ...variant, filters }
                : variant
            ),
          };
        }
        return state;
      });

      setStates(updatedStates);
      handleCloseFilterModal();
      toast.success("Filters updated");
    }
  };
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainbody">

     <div className="container">
      <div className="left-content">
        <ArrowBackIcon sx={{ width: '1.5em', height: '1.5em' }} />
        <h1>Rules creation</h1>
      </div>
      <button className="green-button">Publish Feed</button>
      {/* Your additional content or components can go here */}
    </div>

        <div className="table-container">
          <ToastContainer
            position="top-center"
            autoClose={500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th className="firstColumn"></th>
                  <th className="productFilter">Product Filters</th>

                  {variants.map((variant, index) => (
                    <th key={variant.id} className="header-cell">
                      <div className="header-content">
                        <div className='variantName'>
                          {variant.name}
                        </div>
                        <div className='variantNameIcon'>
                          <button
                            onClick={(event) => handleOpenMenu(event, index)}
                            className="dropdown-btn"
                          >
                            <MoreVertIcon />
                          </button>
                          <Menu
                            anchorEl={anchorEl}
                            open={
                              Boolean(anchorEl) && currentVariantIndex === index
                            }
                            onClose={handleCloseMenu}
                          >
                            <MenuItem
                              onClick={() => handleDeleteVariant(variant.id)}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                    </th>
                  ))}

                  <th className="header-cell fixed-width"></th>
                </tr>
              </thead>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="states">
                  {(provided) => (
                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                      {states.map((state, index) => (
                        <Draggable
                          key={state.id}
                          draggableId={state.id}
                          index={index}
                        >
                          {(provided) => (
                            <tr
                              key={state.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="draggable-row"
                            >
                              <td className="header-cell stateNumber">
                                <div className="buttonClass">
                                  <button
                                    onClick={() => handleDeleteState(state.id)}
                                    className="delete-btn"
                                  >
                                    <FaTrashAlt className="delete-icon" />
                                  </button>
                                </div>
                                <div className="stateId">
                                  {state.id}
                                  <AppsIcon />
                                </div>
                              </td>
                              <td className="header-cell stateName">
                                <div className="filter-container addFilter">
                                  {state.variants[0].filters.length > 0 ? (
                                    state.variants[0].filters
                                      .filter(
                                        (filter) => filter.value.trim() !== ""
                                      )
                                      .map((filter) => (
                                        <div
                                          key={filter.id}
                                          className="filter-chip"
                                        >
                                          {filter.value}
                                        </div>
                                      ))
                                  ) : (
                                    <div className="addFilter">
                                      <button
                                        onClick={() =>
                                          handleOpenFilterModal(
                                            state.id,
                                            state.variants[0].id
                                          )
                                        }
                                        className="AddFilterButton"
                                      >
                                        <FaPlus className="addFilterIcon" />
                                        Add Filter
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>

                              {state.variants.map((variant) => (
                                <td
                                  key={variant.id}
                                  className="table-data header-cell variantNumber"
                                >
                                  {variant.image ? (
                                    <div className="image-container">
                                      <img
                                        src={variant.image}
                                        alt={variant.name}
                                        className="image"
                                      />
                                      <span className="description truncate-text">
                                        {variant.description ||
                                          "No description"}
                                      </span>
                                      <button
                                        onClick={() =>
                                          handleOpenModal(state.id, variant.id)
                                        }
                                        className="edit-image-btn"
                                      >
                                        <FaEdit />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="emptyImage empty-image-placeholder">
                                      <button
                                        onClick={() =>
                                          handleOpenModal(state.id, variant.id)
                                        }
                                        className="upload-image-btn"
                                      >
                                        <FaPlus className="addFilterIcon" />
                                        Upload Image
                                      </button>
                                    </div>
                                  )}
                                </td>
                              ))}
                              <td className="table-data headercell variantNumber">
                                <div className="addVariant">
                                  <button
                                    onClick={handleAddVariant}
                                    className="add-variant-btn"
                                  >
                                    <FaPlus className="add-variant-icon" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <tr>
                        <td colSpan={variants.length + 2}>
                          <div className="buttons">
                            <button
                              onClick={handleAddState}
                              className="add-variant-btn"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Droppable>
              </DragDropContext>
            </table>
          </div>

          <ImageModal open={modalOpen} onClose={handleCloseModal} images={images} handleImageSelect={handleImageSelect} />
      <FilterModal
        open={filterModalOpen}
        onClose={handleCloseFilterModal}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleAddFilter={handleAddFilter}
        handleRemoveFilter={handleRemoveFilter}
        handleSaveFilters={handleSaveFilters}
      />
        </div>
      </div>
    </>
  );
}