// Content script to replace "connections" with "friends" on Roblox
(function() {
    'use strict';

    // Function to replace text in text nodes
    function replaceTextInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Replace various forms of "connections" with "friends"
            let text = node.textContent;
            const replacements = {
                'Connections': 'Friends',
                'connections': 'friends',
                'CONNECTION': 'FRIEND',
                'Connection': 'Friend'
            };
            
            let modified = false;
            for (const [oldText, newText] of Object.entries(replacements)) {
                if (text.includes(oldText)) {
                    text = text.replace(new RegExp(oldText, 'g'), newText);
                    modified = true;
                }
            }
            
            if (modified) {
                node.textContent = text;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Skip script and style elements
            if (node.tagName && ['SCRIPT', 'STYLE'].includes(node.tagName.toUpperCase())) {
                return;
            }
            
            // Process child nodes
            for (let i = 0; i < node.childNodes.length; i++) {
                replaceTextInNode(node.childNodes[i]);
            }
        }
    }

    // Function to replace text in attributes (like placeholder, title, etc.)
    function replaceTextInAttributes(element) {
        if (element.nodeType !== Node.ELEMENT_NODE) return;
        
        const attributesToCheck = ['placeholder', 'title', 'alt', 'aria-label'];
        
        attributesToCheck.forEach(attr => {
            if (element.hasAttribute(attr)) {
                let value = element.getAttribute(attr);
                const replacements = {
                    'Connections': 'Friends',
                    'connections': 'friends',
                    'CONNECTION': 'FRIEND',
                    'Connection': 'Friend'
                };
                
                let modified = false;
                for (const [oldText, newText] of Object.entries(replacements)) {
                    if (value.includes(oldText)) {
                        value = value.replace(new RegExp(oldText, 'g'), newText);
                        modified = true;
                    }
                }
                
                if (modified) {
                    element.setAttribute(attr, value);
                }
            }
        });
    }

    // Function to process the entire document
    function processDocument() {
        // Replace text in all text nodes
        replaceTextInNode(document.body);
        
        // Replace text in attributes
        const allElements = document.querySelectorAll('*');
        allElements.forEach(replaceTextInAttributes);
    }

    // Initial processing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', processDocument);
    } else {
        processDocument();
    }

    // Observer to handle dynamically added content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                    replaceTextInNode(node);
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        replaceTextInAttributes(node);
                        // Also process all child elements
                        const childElements = node.querySelectorAll ? node.querySelectorAll('*') : [];
                        childElements.forEach(replaceTextInAttributes);
                    }
                }
            });
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    console.log('Roblox Friends Text Replacer: Extension loaded and monitoring for text changes');
})();
