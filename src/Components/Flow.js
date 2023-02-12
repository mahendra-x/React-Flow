import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  SelectionMode,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";

import "./text-updater-node.css";
import "../Components/Flow.css";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  {
    id: "1",
    type: "output",
    data: { label: "Ankit" },
    position: { x: 100, y: 70 },
  },
  {
    id: "2",
    type: "input",
    data: { label: "Mahi" },
    position: { x: 200, y: 150 },
  },
];

const initialEdges = [
  { id: "edge-1", source: "1", target: "2" },
  { id: "edge-2", source: "node-1", target: "node-3" },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

let common;

function Flow() {
  const [commonsource, setCommonsource] = React.useState("");
  const [selectid, setSelectid] = React.useState("");
  // const [edgedata,setEdgeData]=React.useState([])

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  // const [nodes, setNodes, onNodesChange] = useNodesState(nodecollection);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(edgedata);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  let blankArray = [];
  let blankArrayEges = [];

  const onAdd = (title, xPos, yPos) => {
    for (let i = 0; i < 3; i++) {
      const mixString = Math.random().toString(16).slice(-4);
      const getNodeId = () => `node_${+new Date()}${mixString}`;
      const XPos = Math.floor(Math.random() * 100) + 50;
      const YPos = Math.floor(Math.random() * 100) + 100;
      let nodeId = getNodeId();

      const newNode = {
        id: nodeId,
        data: { label: <div>{nodeId}</div> },
        // type: 'selectorNode',
        position: {
          x: XPos,
          y: YPos,
        },
        selected: false,
        sourcePosition: "top",
        targetPosition: "bottom",
        style: { border: "0px solid red" },
      };

      if (i == 1) {
        newNode.selected = true;
      }

      if (i == 0) {
        // setCommonsource(data.id);
        common = nodeId;
      }
      // const mixString = Math.random().toString(16).slice(-4);

      if (i != 0) {
        const getEdgeId = () => `edge_${+new Date()}${mixString}`;

        const newEdge = {
          id: getEdgeId(),
          source: common,
          target: nodeId,
          type: "smoothstep",
          animated: true,
          hidden: false,
          label: `Edge`,
          labelShowBg: true,
          selected: false,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#FF0072",
          },
          style: {
            strokeWidth: 1,
            // stroke: '#FF0072',
          },
        };
        if (i == 1) {
          newEdge.selected = true;
          newEdge.style = {
            strokeWidth: 2,
            stroke: "#FF0072",
          };
        }

        blankArrayEges.push(newEdge);
      }

      blankArray.push(newNode);
    }

    setNodes([...nodes, ...blankArray]);

    setEdges([...edges, ...blankArrayEges]);
  };

  const addNode = () => {
    onAdd("hi", 0, 0);
    // onAdd('hello',200, -50);
    // onAdd('world',200, 50);
  };

  const addEdges = () => {
    // let blankArrayEges = [];
    // if (index == 0) {
    //   setCommonsource(data.id);
    //   common = data.id;
    // }
    // const mixString = Math.random().toString(16).slice(-4);
    // const getEdgeId = () => `edge_${+new Date()}${mixString}`;
    // const newEdge = {
    //   id: getEdgeId(),
    //   source: common,
    //   target: data.id,
    //   type: "smoothstep",
    //   animated: true,
    //   hidden: false,
    //   zIndex: 1,
    //   label: `Edge`,
    //   labelShowBg: true,
    //   selected: true,
    // };
    // blankArrayEges.push(newEdge);
    // setEdges([...blankArrayEges]);
  };

  const onNodeClick = (node, event) => {
    const id = node?.target;
    console.log("nodeClick", id);
    setEdges((eds) =>
    eds.map((edge) => {
      console.log('uedge :>> ', edge);
      if(edge.target == selectid){
          edge.style = {
            ...edge.style,

            strokeWidth: 2,
            stroke: "#1725e8",
          };

      }else{
        edge.style = {
          ...edge.style,

          strokeWidth: 1,
          stroke: "#f50fb4",
        };

      }
      // if (edge.selected) {
      //   edge.style = {
      //     ...edge.style,
         
      //       strokeWidth: 2,
      //       stroke: "#1725e8",

          
      //   }
      // }

      return edge;
    })
  );
  };

  const selectAll = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        node.selected = true;

        return node;
      })
    );
  }, [setNodes]);

  // const changeSelector = () => {
  //   setNodes((nds) => 
  //   console.log('nds[2] :>> ', nds[2])
   
  //   )

  // }

  const updateNode = async () => {
    const findElementindex = nodes.findIndex((items) => items.id == selectid);
    console.log("findElementindex", findElementindex);
    // if (findElementindex > -1 && nodes[findElementindex]?.data?.label) {
    //   setNodes((nds) => 
    //     nds.map((node,index) => {
    //       console.log('1node :>> ', node);
    //       if (node.id === selectid) {
    //         // it's important that you create a new object here
    //         // in order to notify react flow about the change
    //         // node.data = {
    //         //   ...node.data,
    //         //   label: "onAdd()",
    //         // };
    //         onAdd()
    //         node.selected = false
           
    //       }else if(index == 2){
    //         // const lastItem = node.pop();
    //         console.log('lastItem :>>');
    //         node.selected = true

    //         // changeSelector()
    //       }
         
        

    //       return node;
    //     })
    //   );
    //   setEdges((eds) =>
    //     eds.map((edge) => {
    //       console.log('uedge :>> ', edge);
    //       if(edge.target == selectid){
    //           edge.style = {
    //             ...edge.style,

    //             strokeWidth: 1,
    //             stroke: "#1725e8",
    //           };

    //       }else{
    //         edge.style = {
    //           ...edge.style,

    //           strokeWidth: 2,
    //           stroke: "#1725e8",
    //         };

    //       }
    //       // if (edge.selected) {
    //       //   edge.style = {
    //       //     ...edge.style,
             
    //       //       strokeWidth: 2,
    //       //       stroke: "#1725e8",

              
    //       //   }
    //       // }

    //       return edge;
    //     })
    //   );
    // }
    if (nodes[findElementindex]) {
      onAdd();
    }
  };

  const onSelectionChange = ({ nodes, edges }) => {
    console.log("selection node :>> ", nodes);
    console.log("selection edges :>> ", edges);
    const id = nodes[0]?.id;
    setSelectid(id);
    console.log("id :>> ", id);
  };

  console.log("selectAll :>> ", selectAll);

  console.log("nodes :>> ", nodes);
  console.log("edges :>> ", edges);
  console.log("id :>> ", selectid);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        elevateEdgesOnSelect={true}
        // nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onSelectionChange={onSelectionChange}
        fitView
        style={rfStyle}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <button onClick={() => addNode()}>Add new</button>
      <button onClick={() => selectAll()}>select All</button>
      <button onClick={() => updateNode()}>update Node</button>
    </div>
  );
}

export default Flow;
