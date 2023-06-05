import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import zoomInIcon from "./icn_zoom_in.svg"
import zoomOutIcon from "./icn_zoom_out.svg"
import zoomFullIcon from "./icn_zoom_full.svg"
import openFullIcon from "./icn_open_full.svg"
import closeIcon from "./icn_close.svg"
import "./OutputBox.css"

export default function OutputBox({sentence, url}){
    const [open, setOpen] = React.useState(false);

    return (
        <>
        <TransformWrapper
            initialScale={0.95}
            centerOnInit={true}
        >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
                <div id="output-wrapper">
                    <p>{sentence}</p>
                    <div className="tools">
                        <button onClick={() => zoomIn()} title="Zoom In">
                            <img src={zoomInIcon} alt="Zoom In Icon"></img>
                        </button>
                        <button onClick={() => zoomOut()} title="Zoom Out">
                            <img src={zoomOutIcon} alt="Zoom Out Icon"></img>
                        </button>
                        <button onClick={() => resetTransform()} title="Reset View">
                            <img src={zoomFullIcon} alt="Reset View Icon"></img>
                        </button>
                        <button onClick={() => setOpen(true)} title="Open Full View">
                            <img src={openFullIcon} alt="Full View Icon"></img>
                        </button>
                    </div>
                    <div id="outputbox">
                        <TransformComponent wrapperClass="transform-comp">
                            <img src={url} alt="analyzed greek text" id="output-img"/>
                        </TransformComponent>
                    </div>
                </div>
            </React.Fragment>
        )}
        </TransformWrapper>
        <Dialog fullScreen open={open} onClose={()=>setOpen(false)}>
            <DialogContent id="dialog-wrapper">
                <TransformWrapper
                    initialScale={0.95}
                    limitToBounds={false}
                    centerOnInit={true}
                >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                        <div id="dialog-tools">
                            <div>
                                <button onClick={() => zoomIn()} title="Zoom In">
                                    <img src={zoomInIcon} alt="Zoom In Icon"></img>
                                </button>
                                <button onClick={() => zoomOut()} title="Zoom Out">
                                    <img src={zoomOutIcon} alt="Zoom Out Icon"></img>
                                </button>
                                <button onClick={() => resetTransform()} title="Reset View">
                                    <img src={zoomFullIcon} alt="Reset View Icon"></img>
                                </button>
                            </div>
                            <button onClick={()=>setOpen(false)} color="primary" autoFocus>
                                <img src={closeIcon} alt="Reset View Icon"></img>
                            </button>
                        </div>
                        <TransformComponent wrapperClass="transform-comp-dialog">
                            <img src={url} alt="analyzed greek text" id="output-img"/>
                        </TransformComponent>
                    </React.Fragment>
                )}
                </TransformWrapper>
            </DialogContent>
        </Dialog>
        </>
    );
}