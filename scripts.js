function mfSelectOPerate(id) {
        let selectElem = document.getElementById(id);
        const searchInput = document.getElementById('mfSearchInput');
        const header = document.getElementById('mfModalHeader');
        header.textContent = selectElem.dataset.mflabel || 'Select Options';
        searchInput.value = '';
        searchInput.focus();

        document.getElementsByClassName('mfSelectDiv')[0].style.display = 'flex';
        let options = selectElem.getElementsByTagName('option');
        document.getElementById('selectedmfSelect').innerHTML = selectElem.id;
        let optionSelect = document.getElementsByClassName('optionsmfSelect')[0];
        optionSelect.innerHTML = '';
        for (let i = 0; i < options.length; i++) {
            var option = options[i].value;
            var checked = options[i].selected ? 'checked' : '';
            var elem = `<label><input type="checkbox" value="${option}" ${checked}>${option} </label>`;
            optionSelect.insertAdjacentHTML('beforeend', elem);
        }
    }
    
    function closemfSelect() {
        document.getElementsByClassName('mfSelectDiv')[0].style.display = 'none';
    }

    function mfSelctOkay() {
        let os = document.getElementsByClassName('optionsmfSelect')[0].getElementsByTagName('input');
        let targetId = document.getElementById('selectedmfSelect').innerHTML;
        let selectElement = document.getElementById(targetId);
        if (selectElement) {
            for (let i = 0; i < selectElement.options.length; i++) {
                selectElement.options[i].selected = false;
            }
            for (let i = 0; i < os.length; i++) {
                if (os[i].checked) {
                    for (let j = 0; j < selectElement.options.length; j++) {
                        if (selectElement.options[j].value === os[i].value) {
                            selectElement.options[j].selected = true;
                        }
                    }
                }
            }
        }
        closemfSelect();
    }

    document.addEventListener('DOMContentLoaded', function () {
        var style = `
            .mfSelectDiv {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.3);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                transition: opacity 0.3s ease;
            }
            .mfSelectDiv .mfSelectContainer {
                background: white;
                width: 90%;
                max-width: 400px;
                border-radius: 10px;;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                padding: 20px;
                position: relative;
                animation: slideUp 0.3s ease;
            }

            @keyframes slideUp {
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            .mfSelectDiv .mfSelectContainer span {
                position: absolute;
                top: 10px;
                right: 14px;
                font-size: 26px;
                font-weight: bold;
                color: #3b82f6;
                cursor: pointer;
                transition: 0.3s;
            }
            .mfSelectDiv .mfSelectContainer span:hover {
                color: rgb(255, 46, 46, 1)
            }
            .mfSelectDiv .mfSelectContainer .HeadermfSelect {
                font-weight: 600;
                font-size: 18px;
                margin-bottom: 12px;
            }
            .mfSelectDiv .mfSelectContainer .mfSearchBox {
                margin-bottom: 12px;
            }

            .mfSelectDiv .mfSelectContainer .mfSearchBox input {
                width: 96%;
                padding: 8px;
                border-radius:10px;
                border: 1px solid#e2e8f0;
                font-size: 14px;
                outline: none;
                transition:all 0.3s ease;
            }

            .mfSelectDiv .mfSelectContainer .mfSearchBox input:focus {
                border-color:#3b82f6;
                box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
            }

            .mfSelectDiv .mfSelectContainer .optionsmfSelect {
                max-height: 250px;
                overflow-y: auto;
                border: 1px solid#e2e8f0;
                border-radius:10px;
                padding: 10px;
                background: #f9fafb;
            }
            .mfSelectDiv .mfSelectContainer .optionsmfSelect label {
                display: flex;
                align-items: center;
                padding: 6px 10px;
                border-radius:10px;
                cursor: pointer;
                transition:all 0.3s ease;
                user-select: none;
            }
            .mfSelectDiv .mfSelectContainer .optionsmfSelect label:hover {
                background: #eef2ff;
            }
            .mfSelectDiv .mfSelectContainer .optionsmfSelect label input {
                margin-right: 8px;
                accent-color:#3b82f6;
                width:fit-content;
            }
            .mfSelectActions {
                margin-top: 15px;
                text-align: right;
            }
            .mfSelectDiv .mfSelectContainer .mfSelectActions button {
                background:#3b82f6;
                color: white;
                border: none;
                padding: 6px 16px;
                border-radius:10px;
                cursor: pointer;
                font-size: 14px;
                transition:all 0.3s ease;
                margin-left: 8px;
            }
            .mfSelectDiv .mfSelectContainer .mfSelectActions button:hover {
                background:#2563eb;
            }`;

        var styleElem = document.createElement('style');
        styleElem.innerHTML = style;
        document.head.appendChild(styleElem);

        var elem = `<div class="mfSelectDiv">
            <span id="selectedmfSelect" style="display:none;"></span>
            <div class="mfSelectContainer">
            <span onclick="closemfSelect()">&times;</span>
            <div class="HeadermfSelect" id="mfModalHeader"><label>Select Options</label></div>
            <div class="mfSearchBox">
                <input type="text" id="mfSearchInput" placeholder="Search options..." />
            </div>
            <div class="optionsmfSelect"></div>
            <div class="mfSelectActions">
                <button onclick="mfSelctOkay()">Okay</button>
            </div>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', elem);

        const searchInput = document.getElementById('mfSearchInput');
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase().trim();
            const labels = document.querySelectorAll('.optionsmfSelect label');
            labels.forEach(label => {
                const text = label.textContent.toLowerCase();
                label.style.display = text.includes(searchTerm) ? 'flex' : 'none';
            });
        });



        if (typeof mfSelectData !== 'undefined') {
            mfSelectData.forEach(element => {
                let Select = document.getElementById(element);
                if (Select) {
                    // Prevent native select opening
                    Select.addEventListener('mousedown', e => e.preventDefault());
                    Select.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
                    Select.addEventListener('change', e => e.preventDefault());

                    // Desktop click -> open custom modal
                    Select.addEventListener('click', e => {
                        e.preventDefault();
                        mfSelectOPerate(Select.id);
                    });

                    // Mobile tap -> open custom modal
                    Select.addEventListener('touchend', e => {
                        e.preventDefault();
                        mfSelectOPerate(Select.id);
                    }, { passive: false });

                    // Style adjustments
                    Select.style.background = '#f9f9f9';
                    Select.style.color = '#555';
                    Select.style.cursor = 'pointer';
                }
            });
        }


    });

    window.mfSelectOPerate = mfSelectOPerate;
    window.closemfSelect = closemfSelect;
    window.mfSelctOkay = mfSelctOkay;
