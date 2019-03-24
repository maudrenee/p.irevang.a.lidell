//här står javascripten
        // vi har skapat variabel listor till alla attribut i json listan
        var room_var = [];        
        var host_var = [];
        var room_type_var = [];
        var borough_var = [];
        var neighbor_var = [];
        var review_var = [];
        var satifaction_var = [];
        var accommodate_var = [];
        var bedroom_var = [];
        var price_var = [];
        var minstay_var = [];
        var latitude_var = [];
        var longitude_var = [];
        var last_modified_var = [];
        
        // loppar igenom datalistan (jsonfilen) för att bygga de nya listorna
        for (var i = 0; i < data.length; i++ ) {
            room_var.push(data[i].room_id);
            host_var.push(data[i].host_id);
            room_type_var.push(data[i].room_type);
            borough_var.push(data[i].borough);
            neighbor_var.push(data[i].neighborhood);
            review_var.push(data[i].reviews);
            satifaction_var.push(data[i].overall_satisfaction);
            accommodate_var.push(data[i].accommodates);
            bedroom_var.push(data[i].bedrooms);
            price_var.push(data[i].price);
            minstay_var.push(data[i].minstay);
            latitude_var.push(data[i].latitude);
            longitude_var.push(data[i].longitude);
            last_modified_var.push(data[i].last_modified);
            }
    
        //Scatter plot of rent prices vs count of reviews
        var data_scatter = [{
        x: price_var,
        y: review_var,
        mode: 'markers',
        type: 'scatter'
        }];
        // här läggs titel och axel rubriker
        var layout_scatter = {
            title: "Price vs Reviews",
            xaxis: {title: "Price"},
            yaxis: {title: "Reviews"},
        }
        //hämtar scatter diven för layout, data och plats för scatterplotten på websidan
        scatter_plot = document.getElementById('scatter');  
        Plotly.plot(scatter_plot, data_scatter, layout_scatter); 

        
        //Piechart 

        //räknar hur många av varje attribut det finns i room type
        var counts = {};
        for (var i = 0; i < room_type_var.length; i++) {
            counts[room_type_var[i]] = 1 + (counts[room_type_var[i]] || 0);
        }
        // räknar om värdet på counts till procent i pie chart
        x_pie_procent = [counts["Entire home/apt"]/(counts["Entire home/apt"]+counts["Private room"]+counts["Shared room"]), 
                        counts["Private room"]/(counts["Entire home/apt"]+counts["Private room"]+counts["Shared room"]),
                        counts["Shared room"]/(counts["Entire home/apt"]+counts["Private room"]+counts["Shared room"])];
        
        // bestämmer värde och labels på objektet counts och lägger in i piechart
        var data_pie = [{
        values: x_pie_procent,
        labels: ['Entire home/apt', 'Private room', 'Shared room'],
        type: 'pie'
        }];
        // titeln på pie chart
        var layout_pie = {
            title: "Pie Room",
            autosize: true 
            
        }
        // hämtar pieplot diven och lägger på data, layout och plats på websidan
        pie_plot = document.getElementById('pie');  
        Plotly.plot(pie_plot, data_pie, layout_pie); 

        //Histogram of rent prices
        var data_histo_price = [{
            x: price_var,
            xbins: {
                end: 800,
                size: 50,
                start: 0
            },
            type: 'histogram',
            marker: {color: 'green',},
                
        }];
        //bestämmer layout på histogramet price/count
        var layout_price = {
            title: "Histogram Rent Price",
            xaxis: {title: "Rent price"},
            yaxis: {title: "Count"},
        }
        // hämtar histo_price diven och lägger på data, layout och plats på websidan
        histo_price = document.getElementById('histogram_price');  
        Plotly.plot(histo_price, data_histo_price, layout_price);   
         
        //Histogram of number of guests (accomodates)
        var data_histo_guest = [{
            x: accommodate_var,
            type: 'histogram',
        }];
        // layout för histogram guest
        var layout_guest = {
            title: "Histogram Guest",
            xaxis: {title: "Number of guests"},
            yaxis: {title: "Count"},
        }
        // hämtar histo_guest diven och lägger på data, layout och plats på websidan
        histo_guest = document.getElementById('histogram_guest');  
        Plotly.plot(histo_guest, data_histo_guest, layout_guest); 
