var padding = {top:20, right:40, bottom:0, left:0},
            w = 650 - padding.left - padding.right,
            h = 650 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = []
                color = d3.scale.category20();//category20c()
            //randomNumbers = getRandomNumbers();
        //http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results
        var data = [
                    {"label":"kẹo",  "value":1,  "question":"https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/chupa_chups_huong_hon_hop_143288a808.jpg"}, // padding
                    {"label":"dây buộc tóc handmade",  "value":2,  "question":"data:image/jpeg;base64,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"}, //font-family
                    {"label":"đồng hồ mini band 6",  "value":3,  "question":"https://cdn.tgdd.vn/Products/Images/7077/236733/mi-band-6-thumbnew-600x600.jpeg"}, //color
                    {"label":"mô hình rắn san hô",  "value":4,  "question":"https://mota.com.vn/wp-content/uploads/2020/10/387251_Coral_Snake_1-220x220-1.png"}, //font-weight
                    {"label":'voucher 70% đồ ăn',  "value":5,"question":"https://dotb.vn/wp-content/uploads/2020/12/6658860_preview.png"},
                    {"label":'voucher 50% nước uống',  "value":6,"question":"https://dotb.vn/wp-content/uploads/2020/12/6658860_preview.png"}
        ]   
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom)
            .attr("class", 'spin-wheel-wrap')
        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            
        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });
        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            }).attr('font-size','20px')
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });
        container.on("click", spin);
        function spin(d){
            console.log(turn)
            
            if(turn>0){container.on("click", null);
            //all slices have been seen, all done
            console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                console.log("done");
                container.on("click", null);
                return;
            }
            turn--;
            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            console.log(rotation,picked)

            if(oldpick.indexOf(picked) !== -1){
                d3.select(this).call(spin);
                return;
            } else {
                // oldpick.push(picked);

            }
            console.log(picked)
            rotation += 90 - Math.round(ps/2);
            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    //mark question as seen


                    // d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                    //     .attr("fill", "#111");
                    //populate question
                    $('.spinwheel-overlay-img').attr('src',data[picked].question);
                    oldrotation = rotation;
                    $('.spinwheel-overlay-text').text(data[picked].label)
                    overlay.show();
                    overlayBody2.show();
              
                    /* Get the result value from object "data" */
                    console.log(data[picked].value)
              
                    /* Comment the below line for restrict spin to sngle time */
                    container.on("click", spin);
                });}
                else{
                    $('.block-spin-wheel').show()
                }
        }
        //make arrow

        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"white","cursor":"pointer"});
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({"font-weight":"bold", "font-size":"30px"});
        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }
            return array;
        }