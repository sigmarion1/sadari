![image](https://github.com/sigmarion1/sadari/assets/39878811/153f2c03-deb8-40ff-8589-81f164ea7a15)



# Sadari (그냥 사다리)

Web based simple randomizer for fun.

## Description

The sadari(korean means "ladder") is the tool for selecting someone randomly. 
Participants line up in a single file and their outcomes are determined based on their arrival at the destination.
The Sadari is currently live on the https://sadari.app website.


## Getting Started

### Dependencies

* Docker, and Docker Compose
* Tested in Windows 10/11 with WSL2, Mac OS

### Installing

```
git clone https://github.com/sigmarion1/sadari
```


### Executing program

* run database docker container 
```
docker compose up db
```

* run back-end development server
```
cd back
npm start
```

* run front-end development server
```
cd front
npm start
```


## Help

```
- avataaars currently not working. (since 2023-07)
- deploying this web application using vercel.
```

## Authors

Contributors names and contact info

- sigmarion1  

## Version History

* 0.2
    * Various bug fixes and optimizations
* 0.1
    * Initial Release

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.

* [react](https://react.dev/)
* [avataaars](https://avatars.dicebear.com/api/avataaars/)

