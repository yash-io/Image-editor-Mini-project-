import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
//added dnd
const Component_pdf = () => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                newImages.push({
                    id: `image-${Date.now()}-${i}`,
                    data: reader.result,
                    name: file.name,
                });
                if (newImages.length === files.length) {
                    setImages(prevImages => [...prevImages, ...newImages]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                newImages.push({
                    id: `image-${Date.now()}-${i}`,
                    data: reader.result,
                    name: file.name,
                });
                if (newImages.length === files.length) {
                    setImages(prevImages => [...prevImages, ...newImages]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDelete = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedImages = Array.from(images);
        const [removed] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, removed);
        setImages(reorderedImages);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        images.forEach((image, index) => {
            if (index > 0) {
                doc.addPage();
            }
            doc.text(image.name, 10, 10);
            doc.addImage(image.data, 'JPEG', 10, 20, 180, 160);
        });
        doc.save('converted_images.pdf');
    };

    const refresh = () => {
        window.location.reload();
    };

    return (
        <div className="bg-gray-600 text-white min-h-screen flex flex-col items-center">
            <nav className="w-11/12 bg-gray-800 p-4 flex mt-8 mx-2 justify-between items-center rounded-md">
                <div className="flex items-center">
                    <span className="text-xl font-bold">Image to PDF Converter</span>
                </div>
                <label htmlFor="image-upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Upload Images
                </label>
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </nav>
            <div
                className="w-11/12 md:w-3/4 lg:w-1/2 bg-gray-800 rounded-lg p-6 mt-6"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {images.length === 0 ? (
                    <div className="border-4 border-dashed border-gray-600 rounded-lg p-10 text-center text-gray-400">
                        Drag and drop images here or click to upload
                    </div>
                ) : (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="images">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                                >
                                    {images.map((image, index) => (
                                        <Draggable key={image.id} draggableId={image.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="relative"
                                                >
                                                    <img src={image.data} alt={image.name} className="rounded-lg mb-2" />
                                                    <button
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
                {images.length > 0 && (
                    <button
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={generatePDF}
                    >
                        Convert to PDF
                    </button>
                )}
            </div>
            <button className="sticky mt-8 bg-green-500 p-2 rounded-md" onClick={refresh}>
                Refresh
            </button>
        </div>
    );
};

export default Component_pdf;