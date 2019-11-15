Papa.parse("https://jennilint.github.io/data.csv", {
    download: true,
    complete: function(result) {
        
        let container = document.createElement('div');
        container.className = "container";
        document.body.appendChild(container);

        let dataByKey = {};

        for (let dataPoint of result.data) {
            let gender = dataPoint[0];
            let ageGroup = dataPoint[1];
            let year = dataPoint[2];
            let percentage = dataPoint[3];

            if (dataByKey[year] === undefined) {
                dataByKey[year] = {};
            }
            if (dataByKey[year][ageGroup] === undefined) {
                dataByKey[year][ageGroup] = {};
            }
            dataByKey[year][ageGroup][gender] = percentage;
        }

        function perc2color(perc) {
            var r, g, b = 0;
            if(perc <= 50) {
                r = 255;
                g = Math.round(5.1 * perc);
            }
            else {
                g = 255;
                r = Math.round(510 - 5.10 * perc);
            }
            return "rgb(" + r + "," + g + "," + b + ")";
        };

        console.log(dataByKey);

        for (let year of Object.keys(dataByKey)) {
            let yearContainer = document.createElement("div");
            yearContainer.className = "yearContainer";

            for (let ageGroup of Object.keys(dataByKey[year])) {
                let ageGroupContainer = document.createElement("div");
                ageGroupContainer.className = "ageGroupContainer";

                let ageGroupText = document.createElement("p");
                ageGroupText.innerHTML = ageGroup.replace("years", "");
                ageGroupContainer.append(ageGroupText);

                for (let gender of Object.keys(dataByKey[year][ageGroup])) {
                    let genderContainer = document.createElement("div");
                    genderContainer.className = "genderContainer";

                    let genderIcon = document.createElement("img");
                    if(gender === "Men") {
                            genderIcon.src = "male.jpg";
                            genderIcon.style.height = "15px";
                            genderIcon.style.marginBottom = "13px";
                        }
                    else {
                            genderIcon.src = "female.jpg";
                            genderIcon.style.height = "18px";
                            genderIcon.style.marginBottom = "10px";
                    };
                       

                let square = document.createElement("div");
                square.className = "square";
                square.style.backgroundColor = perc2color(dataByKey[year][ageGroup][gender]);
                square.style.width = "50px";
                square.style.height = "50px";
                square.style.margin = "5px";
                let percentageText = document.createElement("p");
                percentageText.className = "percentageText";
                if (dataByKey[year][ageGroup][gender] === "-") {
                    percentageText.innerHTML = "?";
                }
                else {
                    percentageText.innerHTML = dataByKey[year][ageGroup][gender] + "%";
                };

                let infoContainer = document.createElement("div");
                infoContainer.className = "infoContainer" ;
                infoContainer.style.width = "85px";
                infoContainer.style.height = "50px";
                infoContainer.style.backgroundColor = perc2color(dataByKey[year][ageGroup][gender]);
                let infoContainerText = document.createElement("p");
                infoContainerText.className = "infoContainerText";
                infoContainerText.innerHTML = "%: " + dataByKey[year][ageGroup][gender] + "<br>" + gender + "<br>" + "Age group: " + ageGroup.replace("years", "") + "<br>" + "Year: " + year;
                infoContainer.append(infoContainerText);

                square.append(percentageText);
                square.append(infoContainer);
                
                genderContainer.append(genderIcon);
                genderContainer.append(square);
                
        
                ageGroupContainer.append(genderContainer);
                yearContainer.append(ageGroupContainer);
            }
        }

            let yearTitle = document.createElement("h2");
            yearTitle.innerHTML = year;


            yearContainer.appendChild(yearTitle);
            container.appendChild(yearContainer);

        }
        let colorValue = document.createElement("div");
        colorValue.className = "colorValue";
        document.body.appendChild(colorValue);

        let colorValueText0 = document.createElement("p");
        colorValueText0.className = "colorValueText0";
        colorValueText0.innerHTML = "0%";
        colorValue.appendChild(colorValueText0);

        let colorValueText100 = document.createElement("p");
        colorValueText100.className = "colorValueText100";
        colorValueText100.innerHTML = "100%";
        colorValue.appendChild(colorValueText100);
    }
})
